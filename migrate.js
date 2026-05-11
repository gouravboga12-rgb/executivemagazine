import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Read .env manually
const envContent = fs.readFileSync('.env', 'utf-8')
const env = Object.fromEntries(
  envContent.split('\n')
    .filter(line => line.includes('='))
    .map(line => {
      const parts = line.split('=')
      return [parts[0].trim(), parts.slice(1).join('=').trim()]
    })
)

const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY
)

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${env.VITE_CLOUDINARY_CLOUD_NAME}/upload`
const PRESET = env.VITE_CLOUDINARY_UPLOAD_PRESET

const pdfs = [
  { 
    title: 'The Executives Magazine', 
    edition: 'Edition N — Landmark Issue',
    path: 'magazine-1 (1)_SinglePages copy.pdf' 
  },
  { 
    title: 'Executives Magazine', 
    edition: 'Rise & Influence Edition',
    path: 'magazine-2_SinglePages.pdf' 
  },
  { 
    title: 'Full Magazine 2023', 
    edition: 'Annual Collector\'s Edition',
    path: 'magazine-3_SinglePages.pdf' 
  },
  { 
    title: 'The Executives Magazine', 
    edition: 'Full Edition — Complete Issue',
    path: 'magazine-4_SinglePages.pdf' 
  },
  { 
    title: 'The Executives Magazine', 
    edition: 'Special Anniversary Edition v1',
    path: 'magazine-5 (2)_SinglePages.pdf' 
  }
]

async function uploadFile(filePath) {
  console.log(`Uploading ${filePath}...`)
  const fileData = fs.readFileSync(filePath)
  
  const formData = new FormData()
  formData.append('file', new Blob([fileData]))
  formData.append('upload_preset', PRESET)

  const res = await fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: formData
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('Cloudinary Response:', text)
    throw new Error(`Upload failed with status ${res.status}`)
  }

  const data = await res.json()
  return data.secure_url
}

async function migrate() {
  console.log('Starting migration...')
  console.log('Using Cloud Name:', env.VITE_CLOUDINARY_CLOUD_NAME)
  console.log('Using Preset:', PRESET)
  
  for (const pdf of pdfs) {
    try {
      const fullPath = path.join(process.cwd(), pdf.path)
      if (!fs.existsSync(fullPath)) {
        console.error(`File not found: ${fullPath}`)
        continue
      }

      const url = await uploadFile(fullPath)
      console.log(`Uploaded! URL: ${url}`)

      // Update or insert
      const { data: existing } = await supabase
        .from('magazines')
        .select('id')
        .eq('edition', pdf.edition)
        .single()

      if (existing) {
        const { error } = await supabase
          .from('magazines')
          .update({ pdf_url: url })
          .eq('id', existing.id)
        if (error) throw error
        console.log(`Updated ${pdf.title} in database.`)
      } else {
        const { error } = await supabase.from('magazines').insert([{
          title: pdf.title,
          edition: pdf.edition,
          pdf_url: url,
          image_url: 'https://images.unsplash.com/photo-1586339949916-3e945caebbca?auto=format&fit=crop&q=80',
          tag: 'Editorial',
          description: `${pdf.title} - ${pdf.edition}`,
          featured: pdf.edition.includes('Landmark')
        }])
        if (error) throw error
        console.log(`Inserted ${pdf.title} to database.`)
      }
    } catch (err) {
      console.error(`Failed to process ${pdf.title}:`, err.message)
    }
  }
  
  console.log('Migration complete!')
}

migrate()
