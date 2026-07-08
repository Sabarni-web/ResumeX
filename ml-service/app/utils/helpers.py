import re
import string

def clean_text(text: str) -> str:
    # Basic text normalization
    text = text.lower()
    text = re.sub(r'\s+', ' ', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    return text.strip()
