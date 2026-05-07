
import fitz  # PyMuPDF
import sys
import os

def extract_pdf_data(pdf_path, output_image_path):
    try:
        doc = fitz.open(pdf_path)
        output_dir = os.path.dirname(output_image_path)
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        # 1. Extract all pages as images
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2)) # Higher resolution
            if page_num == 0:
                pix.save(output_image_path) # Main cover image
                # Also save as page_1.png for consistency
                pix.save(os.path.join(output_dir, "page_1.png"))
            else:
                pix.save(os.path.join(output_dir, f"page_{page_num + 1}.png"))
        
        # 2. Extract text from all pages
        full_text = ""
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            full_text += page.get_text()
            full_text += "\n--- PAGE BREAK ---\n"
            
        doc.close()
        return full_text
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python extract_pdf.py <pdf_path> <output_image_path>")
        sys.exit(1)
        
    pdf_path = sys.argv[1]
    output_image_path = sys.argv[2]
    
    text = extract_pdf_data(pdf_path, output_image_path)
    output_text_path = pdf_path.replace(".pdf", ".txt")
    with open(output_text_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Text saved to {output_text_path}")
