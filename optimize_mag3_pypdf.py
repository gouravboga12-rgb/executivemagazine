from pypdf import PdfReader, PdfWriter
import os

def pypdf_compress(input_path, output_path):
    print(f"Compressing with pypdf: {input_path}...")
    try:
        reader = PdfReader(input_path)
        writer = PdfWriter()

        for page in reader.pages:
            # This compresses the internal streams without losing image quality
            page.compress_content_streams()
            writer.add_page(page)

        with open(output_path, "wb") as f:
            writer.write(f)
            
        orig_size = os.path.getsize(input_path) / (1024 * 1024)
        new_size = os.path.getsize(output_path) / (1024 * 1024)
        print(f"  Success: {orig_size:.2f}MB -> {new_size:.2f}MB")
    except Exception as e:
        print(f"  Error: {e}")

pypdf_compress("magazine-3_SinglePages.pdf", "public/magazine-3.pdf")
