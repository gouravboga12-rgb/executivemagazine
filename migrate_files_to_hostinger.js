import dotenv from 'dotenv'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { pipeline } from 'stream/promises'
import FormData from 'form-data'

dotenv.config()

const hostingerApiUrl = process.env.VITE_API_URL
const TEMP_DIR = './temp_migration'

if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR)

async function downloadFile(url, filename) {
    if (!url || !url.startsWith('http')) return null
    const localPath = path.join(TEMP_DIR, filename)
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to download ${url}`)
    await pipeline(response.body, fs.createWriteStream(localPath))
    return localPath
}

async function uploadToHostinger(localPath) {
    if (!localPath) return null
    const form = new FormData()
    form.append('file', fs.createReadStream(localPath))

    const response = await fetch(`${hostingerApiUrl}?action=upload`, {
        method: 'POST',
        body: form
    })
    const data = await response.json()
    return data.url
}

async function startMigration() {
    console.log('📦 Starting FULL File Migration to Hostinger...')

    try {
        // 1. Migrate Magazine Files
        console.log('\n--- Processing Magazines ---')
        const magRes = await fetch(`${hostingerApiUrl}?action=get_magazines`)
        const magazines = await magRes.json()

        for (const mag of magazines) {
            let newPdf = mag.pdf_url
            let newImg = mag.image_url

            if (mag.pdf_url?.includes('cloudinary') || mag.pdf_url?.includes('supabase')) {
                console.log(`Downloading PDF for: ${mag.title}`)
                const localPdf = await downloadFile(mag.pdf_url, `mag_${mag.id}.pdf`)
                newPdf = await uploadToHostinger(localPdf)
            }

            if (mag.image_url?.includes('cloudinary') || mag.image_url?.includes('supabase')) {
                console.log(`Downloading Image for: ${mag.title}`)
                const localImg = await downloadFile(mag.image_url, `mag_${mag.id}.jpg`)
                newImg = await uploadToHostinger(localImg)
            }

            if (newPdf !== mag.pdf_url || newImg !== mag.image_url) {
                console.log(`Updating database for: ${mag.title}`)
                await fetch(`${hostingerApiUrl}?action=update_magazine_urls`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: mag.id, pdf_url: newPdf, image_url: newImg })
                })
            }
        }

        // 2. Migrate Interview Files
        console.log('\n--- Processing Interviews ---')
        const intRes = await fetch(`${hostingerApiUrl}?action=get_interviews`)
        const interviews = await intRes.json()

        for (const int of interviews) {
            let newPdf = int.pdf_url
            let newPre = int.preview_url

            if (int.pdf_url?.includes('cloudinary') || int.pdf_url?.includes('supabase')) {
                console.log(`Downloading PDF for: ${int.company}`)
                const localPdf = await downloadFile(int.pdf_url, `int_${int.id}.pdf`)
                newPdf = await uploadToHostinger(localPdf)
            }

            if (int.preview_url?.includes('cloudinary') || int.preview_url?.includes('supabase')) {
                console.log(`Downloading Preview for: ${int.company}`)
                const localPre = await downloadFile(int.preview_url, `int_${int.id}.jpg`)
                newPre = await uploadToHostinger(localPre)
            }

            if (newPdf !== int.pdf_url || newPre !== int.preview_url) {
                console.log(`Updating database for: ${int.company}`)
                await fetch(`${hostingerApiUrl}?action=update_interview_urls`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: int.id, pdf_url: newPdf, preview_url: newPre })
                })
            }
        }

        console.log('\n✅ ALL FILES MIGRATED TO HOSTINGER!')
        console.log('You can now safely delete your Cloudinary and Supabase accounts.')

    } catch (error) {
        console.error('❌ File Migration Failed:', error.message)
    } finally {
        // Cleanup temp files
        if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true, force: true })
    }
}

startMigration()
