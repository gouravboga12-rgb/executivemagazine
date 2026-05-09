import fitz
import os

def compress_pdf(input_path, output_path):
    print(f"Compressing {input_path}...")
    try:
        doc = fitz.open(input_path)
        # garbage=4 is the highest level of garbage collection
        # deflate=True enables stream compression
        doc.save(output_path, garbage=4, deflate=True, clean=True)
        doc.close()
        
        orig_size = os.path.getsize(input_path) / (1024 * 1024)
        new_size = os.path.getsize(output_path) / (1024 * 1024)
        print(f"  Success: {orig_size:.2f}MB -> {new_size:.2f}MB")
    except Exception as e:
        print(f"  Error compressing {input_path}: {e}")

# Mapping of source files to public destination
magazines = [
    ("magazine-1 (1)_SinglePages copy.pdf", "public/magazine-1.pdf"),
    ("magazine-2_SinglePages.pdf", "public/magazine-2.pdf"),
    ("magazine-3_SinglePages.pdf", "public/magazine-3.pdf"),
    ("magazine-4_SinglePages.pdf", "public/magazine-4.pdf"),
    ("magazine-5 (2)_SinglePages.pdf", "public/magazine-5.pdf"),
]

# Ensure public directory exists
if not os.path.exists("public"):
    os.makedirs("public")

for src, dest in magazines:
    if os.path.exists(src):
        compress_pdf(src, dest)
    else:
        print(f"Source file not found: {src}")
