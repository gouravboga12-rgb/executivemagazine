import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY
const hostingerApiUrl = process.env.VITE_API_URL

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrate() {
    console.log('🚀 Starting Migration from Supabase to Hostinger...')

    try {
        // 1. Migrate Magazines
        console.log('--- Migrating Magazines ---')
        const { data: magazines, error: magError } = await supabase.from('magazines').select('*')
        if (magError) throw magError

        for (const mag of magazines) {
            console.log(`Pushing magazine: ${mag.title}`)
            await fetch(`${hostingerApiUrl}?action=add_magazine`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: mag.title,
                    edition: mag.edition,
                    pdf_url: mag.pdf_url,
                    image_url: mag.image_url,
                    tag: mag.tag,
                    description: mag.description,
                    featured: mag.featured
                })
            })
        }

        // 2. Migrate Interviews
        console.log('\n--- Migrating Interviews ---')
        const { data: interviews, error: intError } = await supabase.from('interviews').select('*')
        if (intError) throw intError

        for (const int of interviews) {
            console.log(`Pushing interview: ${int.company}`)
            await fetch(`${hostingerApiUrl}?action=add_interview`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    company: int.company,
                    preview_url: int.preview_url,
                    pdf_url: int.pdf_url,
                    industry: int.industry
                })
            })
        }

        console.log('\n✅ Migration Finished Successfully!')
        console.log('Go to your Admin Panel and refresh to see the data.')

    } catch (error) {
        console.error('❌ Migration Failed:', error.message)
    }
}

migrate()
