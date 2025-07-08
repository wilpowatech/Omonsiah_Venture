js_content = """
document.addEventListener('DOMContentLoaded', () => {
  console.log('Site loaded successfully');
});
"""

# Write files to respective locations
with open(os.path.join(project_root, "index.html"), "w") as f:
    f.write(html_content)

with open(os.path.join(css_folder, "style.css"), "w") as f:
    f.write(css_content)

with open(os.path.join(js_folder, "script.js"), "w") as f:
    f.write(js_content)

# Dummy image creation (placeholder rectangles)
from PIL import Image, ImageDraw

for name in ["bed.jpg", "surgical.jpg", "lab.jpg"]:
    img = Image.new("RGB", (300, 200), color="lightgray")
    d = ImageDraw.Draw(img)
    d.text((80, 90), name.split('.')[0].capitalize(), fill=(0, 0, 0))
    img.save(os.path.join(images_folder, name))

project_root
