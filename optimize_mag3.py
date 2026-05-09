import fitz
import os

def aggressive_compress(input_path, output_path):
    print(f"Aggressively compressing {input_path}...")
    try:
        doc = fitz.open(input_path)
        # linear=True is for Web Optimization (Fast Web View)
        # garbage=4 for maximum object removal
        # deflate=True for stream compression
        doc.save(output_path, garbage=4, deflate=True, clean=True, linear=True)
        doc.close()
        
        orig_size = os.path.getsize(input_path) / (1024 * 1024)
        new_size = os.path.getsize(output_path) / (1024 * 1024)
        print(f"  Success: {orig_size:.2f}MB -> {new_size:.2f}MB")
    except Exception as e:
        print(f"  Error: {e}")

# Target specific file
target = "magazine-3_SinglePages.pdf"
dest = "public/magazine-3.pdf"

if os.path.exists(target):
    aggressive_compress(target, dest)
else:
    print(f"File not found: {target}")
