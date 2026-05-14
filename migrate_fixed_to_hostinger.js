import dotenv from 'dotenv'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import FormData from 'form-data'

dotenv.config()

const hostingerApiUrl = process.env.VITE_API_URL
const PUBLIC_DIR = './public'

const FIXED_INTERVIEWS = [
  {
    company: 'Alfa Laval India Limited',
    img: '/interview-covers/alfalaval-cover.png',
    pdf: '/interview pages/Alfa Laval India Limited-story.pdf',
    tag: 'Industrial'
  },
  {
    company: 'HiMedia Laboratories',
    img: '/interview-covers/himedia-cover.png',
    pdf: '/interview pages/HiMedia-Laboratories_3.pdf',
    tag: 'Bioscience'
  },
  {
    company: 'Kitex Garments',
    img: '/interview-images/kitex-garments/page_1.png',
    pdf: '/interview pages/Kitex Garments - Vision & Culture_pdf.pdf',
    tag: 'Textiles'
  },
  {
    company: 'Nagarjuna Construction Company Ltd',
    img: '/interview-images/nagarjuna-construction-company-ltd/page_1.png',
    pdf: '/interview pages/Nagarjuna-Construction-Company-Ltd.pdf',
    tag: 'Construction'
  },
  {
    company: 'National Engineering Industries Ltd',
    img: '/interview-covers/national-engineering-cover.png',
    pdf: '/interview pages/National Engineering Industries Ltd-story - Copy.pdf',
    tag: 'Engineering'
  },
  {
    company: 'Sandur Manganese',
    img: '/interview-images/sandur-manganese/page_1.png',
    pdf: '/interview pages/Sandur Manganese.pdf',
    tag: 'Mining'
  },
  {
    company: 'Vitabiotics',
    img: '/interview-covers/vitabiotics-cover.png',
    pdf: '/interview pages/Vitabiotics-.pdf',
    tag: 'Pharmaceutical'
  },
  {
    company: 'IRM Energy',
    img: '/interview-covers/irm-energy-cover.png',
    pdf: '/interview pages/IRM Energy Private Limited.pdf',
    tag: 'Energy'
  }
]

async function uploadToHostinger(relativePath) {
    if (!relativePath) return null
    const fullPath = path.join(PUBLIC_DIR, relativePath)
    if (!fs.existsSync(fullPath)) {
        console.warn(`File not found: ${fullPath}`)
        return null
    }

    const form = new FormData()
    form.append('file', fs.createReadStream(fullPath))

    const response = await fetch(`${hostingerApiUrl}?action=upload`, {
        method: 'POST',
        body: form
    })
    const data = await response.json()
    return data.url
}

async function migrateFixed() {
    console.log('🚚 Migrating Fixed Interviews to Hostinger Database...')

    for (const item of FIXED_INTERVIEWS) {
        try {
            console.log(`Processing: ${item.company}`)
            
            const uploadedImg = await uploadToHostinger(item.img)
            const uploadedPdf = await uploadToHostinger(item.pdf)

            const response = await fetch(`${hostingerApiUrl}?action=add_interview`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    company: item.company,
                    industry: item.tag,
                    preview_url: uploadedImg,
                    pdf_url: uploadedPdf
                })
            })
            const result = await response.json()
            if (result.success) {
                console.log(`✅ ${item.company} is now in the database!`)
            }
        } catch (err) {
            console.error(`❌ Failed to migrate ${item.company}:`, err.message)
        }
    }

    console.log('\n✨ DONE! All fixed interviews are now dynamic and editable.')
}

migrateFixed()
