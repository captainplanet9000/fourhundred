# 400 Club — ComfyUI Wan 2.1/2.2 Text-to-Video Reveal Prompts

> Based on the 400 Club Gilded Age painting style from `gilded_age_paintings` dataset

---

## Core Style (from dataset)

```
Gilded Age oil painting, ornate gold frame, warm chiaroscuro, 
impasto texture, high-detail brushwork, museum lighting, vintage patina
```

---

## Workflow Settings

```yaml
Model: Wan 2.1 / Wan 2.2 T2V
Resolution: 512x512 or 768x768
Frames: 81 (default) or 49 for shorter
FPS: 16 or 24
CFG Scale: 6.0 - 7.0
Steps: 30-50
Sampler: DPM++ 2M or Euler
Scheduler: Normal or Karras
```

---

## Prompt 1: Burgundy Curtain Reveal

**Positive Prompt:**
```
Gilded Age oil painting, ornate gold frame, warm chiaroscuro, impasto texture, high-detail brushwork, museum lighting, vintage patina, burgundy velvet curtains slowly parting, golden light emerging from center, ornate gold tassels, rich fabric folds, dramatic shadows, the painting slowly comes alive, elegant motion
```

**Negative Prompt:**
```
photorealistic, photo, 3D render, CGI, digital art, modern, cartoon, anime, flat colors, blurry, low quality, watermark, text
```

---

## Prompt 2: Dark Velvet Drape

**Positive Prompt:**
```
Gilded Age oil painting, ornate gold frame, warm chiaroscuro, impasto texture, high-detail brushwork, museum lighting, vintage patina, dark velvet drape being drawn aside, deep burgundy fabric, golden highlights catching on folds, warm amber light flooding through, antique atmosphere, the painted scene gently animates
```

**Negative Prompt:**
```
photorealistic, photo, 3D render, CGI, digital art, modern, cartoon, anime, flat colors, blurry, low quality, watermark, text
```

---

## Prompt 3: Grand Theater Curtain

**Positive Prompt:**
```
Gilded Age oil painting, ornate gold frame, warm chiaroscuro, impasto texture, high-detail brushwork, museum lighting, vintage patina, grand Victorian theater curtains sweeping open, wine-red velvet with gold embroidery, elaborate gold fringe and tassels, dramatic stage lighting, the masterwork slowly breathes
```

**Negative Prompt:**
```
photorealistic, photo, 3D render, CGI, digital art, modern, cartoon, anime, flat colors, blurry, low quality, watermark, text
```

---

## Prompt 4: Intimate Curtain Corner

**Positive Prompt:**
```
Gilded Age oil painting, ornate gold frame, warm chiaroscuro, impasto texture, high-detail brushwork, museum lighting, vintage patina, close view of velvet curtain corner being pulled back, single golden tassel swinging gently, warm studio lighting, intimate portrait reveal, soft golden particles, the painting surface undulates
```

**Negative Prompt:**
```
photorealistic, photo, 3D render, CGI, digital art, modern, cartoon, anime, flat colors, blurry, low quality, watermark, text
```

---

## Prompt 5: Royal Presentation

**Positive Prompt:**
```
Gilded Age oil painting, ornate gold frame, warm chiaroscuro, impasto texture, high-detail brushwork, museum lighting, vintage patina, symmetrical royal curtains drawing apart, crimson velvet with ermine trim, elaborate gold bullion fringe, majestic golden light from center, regal atmosphere, slow ceremonial motion
```

**Negative Prompt:**
```
photorealistic, photo, 3D render, CGI, digital art, modern, cartoon, anime, flat colors, blurry, low quality, watermark, text
```

---

## ComfyUI Node Settings

### Wan T2V Sampler Settings
```json
{
  "steps": 40,
  "cfg": 7.0,
  "sampler_name": "dpmpp_2m",
  "scheduler": "karras",
  "denoise": 1.0
}
```

### Video Output Settings
```json
{
  "width": 512,
  "height": 512,
  "num_frames": 81,
  "fps": 16,
  "loop": true
}
```

### For Higher Quality (slower)
```json
{
  "width": 768,
  "height": 768,
  "num_frames": 49,
  "steps": 50,
  "cfg": 6.5
}
```

---

## Prompt Structure

### Base Style Prefix (always include)
```
Gilded Age oil painting, ornate gold frame, warm chiaroscuro, impasto texture, high-detail brushwork, museum lighting, vintage patina
```

### Motion Suffixes (add to end)
```
the painting slowly comes alive
the painted scene gently animates  
the masterwork slowly breathes
the painting surface undulates
slow ceremonial motion
elegant motion
```

### Subject Variations
```
burgundy velvet curtains slowly parting
dark velvet drape being drawn aside
grand Victorian theater curtains sweeping open
velvet curtain corner being pulled back
symmetrical royal curtains drawing apart
```

---

## Workflow Tips for ComfyUI

1. **Start with 512x512** at 49 frames to test
2. **Increase to 768x768** for final quality
3. **Use 81 frames** for smoother loops
4. **CFG 6-7** works best for Wan

### Workflow Order:
```
Text Encode → Wan T2V Sampler → Video Decode → Save Video (GIF)
```

---

## Quick Copy Prompts

### Prompt 1 (Copy-Paste Ready)
```
Gilded Age oil painting, ornate gold frame, warm chiaroscuro, impasto texture, high-detail brushwork, museum lighting, vintage patina, burgundy velvet curtains slowly parting, golden light emerging from center, ornate gold tassels, rich fabric folds, dramatic shadows, the painting slowly comes alive, elegant motion
```

### Prompt 2 (Copy-Paste Ready)
```
Gilded Age oil painting, ornate gold frame, warm chiaroscuro, impasto texture, high-detail brushwork, museum lighting, vintage patina, dark velvet drape being drawn aside, deep burgundy fabric, golden highlights catching on folds, warm amber light flooding through, antique atmosphere, the painted scene gently animates
```

### Prompt 3 (Copy-Paste Ready)
```
Gilded Age oil painting, ornate gold frame, warm chiaroscuro, impasto texture, high-detail brushwork, museum lighting, vintage patina, grand Victorian theater curtains sweeping open, wine-red velvet with gold embroidery, elaborate gold fringe and tassels, dramatic stage lighting, the masterwork slowly breathes
```

### Universal Negative (Copy-Paste Ready)
```
photorealistic, photo, 3D render, CGI, digital art, modern, cartoon, anime, flat colors, blurry, low quality, watermark, text
```

---

*Based on 400 Club gilded_age_paintings dataset — ComfyUI Wan 2.1/2.2*
