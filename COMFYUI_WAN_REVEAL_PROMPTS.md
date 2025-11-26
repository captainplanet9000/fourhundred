# 400 Club — ComfyUI Wan 2.1 Text-to-Video Reveal Prompts

> Optimized prompts for Wan 2.1/2.2 text-to-video generation in ComfyUI

---

## Workflow Settings

```yaml
Model: Wan 2.1 / Wan 2.2 T2V
Resolution: 512x512 or 768x768
Frames: 81 (default) or 49 for shorter
FPS: 16 or 24
CFG Scale: 6.0 - 7.5
Steps: 30-50
Sampler: DPM++ 2M or Euler
Scheduler: Normal or Karras
```

---

## Prompt 1: Classic Burgundy Curtain Reveal

**Positive Prompt:**
```
masterpiece, best quality, oil painting style, 
burgundy velvet curtains slowly parting from center, 
thick visible brushstrokes on fabric, golden light emerging from gap,
ornate gold tassels and braided cord, dramatic chiaroscuro lighting,
warm amber candlelight rays, dust particles floating in light beams,
John Singer Sargent painting technique, impasto texture on velvet folds,
dark background, Victorian aesthetic, museum quality,
elegant slow motion, cinematic lighting
```

**Negative Prompt:**
```
worst quality, low quality, blurry, distorted, deformed, 
ugly, bad anatomy, watermark, signature, text, logo,
photorealistic, 3D render, CGI, modern, neon, bright colors,
cartoon, anime, illustration, flat lighting, overexposed
```

---

## Prompt 2: Dark Velvet Drape Unveiling

**Positive Prompt:**
```
masterpiece, best quality, classical oil painting animation,
dark velvet drape being drawn aside, deep burgundy and umber tones,
visible canvas texture, heavy impasto paint creating fabric folds,
golden highlight on velvet pile, antique gold fringe trim,
warm ochre light flooding through opening, Rembrandt lighting style,
Old Masters technique, rich varnished finish, painted dust motes,
dramatic shadows, museum gallery atmosphere, slow elegant movement
```

**Negative Prompt:**
```
worst quality, low quality, blurry, distorted, deformed,
ugly, bad anatomy, watermark, signature, text, logo,
photorealistic, CGI, digital art, smooth gradients, plastic,
cartoon, anime, modern style, harsh lighting, overexposed
```

---

## Prompt 3: Grand Theater Curtain Opening

**Positive Prompt:**
```
masterpiece, best quality, 19th century academic oil painting style,
ornate Victorian theater curtains sweeping open dramatically,
deep wine-red velvet with visible brushwork texture,
elaborate gold embroidery and massive painted tassels,
dramatic stage lighting as golden rays piercing through,
William Bouguereau painting technique, proscenium arch frame visible,
painted shadows in fabric folds, floating gold dust particles,
grand theatrical reveal, warm amber atmosphere, slow majestic motion
```

**Negative Prompt:**
```
worst quality, low quality, blurry, distorted, deformed,
ugly, bad anatomy, watermark, signature, text, logo,
photorealistic, 3D render, video game, contemporary style,
cartoon, anime, flat colors, harsh shadows, overexposed
```

---

## Prompt 4: Intimate Portrait Curtain

**Positive Prompt:**
```
masterpiece, best quality, detailed oil painting close-up,
rich velvet curtain corner being gently pulled back,
extreme detail in painted fabric texture, individual brushstrokes visible,
deep burgundy transitioning to black in shadows,
single golden rope tassel swinging gently,
warm portrait studio lighting in amber gold tones,
John Singer Sargent fabric study style, craquelure aged paint texture,
varnish gleam catching light, intimate scale,
gentle breathing movement, soft golden particles floating
```

**Negative Prompt:**
```
worst quality, low quality, blurry, distorted, deformed,
ugly, bad anatomy, watermark, signature, text, logo,
photorealistic, CGI, smooth texture, plastic look,
cartoon, anime, harsh lighting, fast motion, jerky movement
```

---

## Prompt 5: Royal Presentation Curtains

**Positive Prompt:**
```
masterpiece, best quality, grand classical oil painting,
symmetrical royal presentation curtains drawing apart majestically,
sumptuous crimson velvet with ermine fur trim painted in oil,
elaborate gold bullion fringe with metallic shimmer,
royal crown motif embroidered in gold thread,
majestic golden light revealing from center,
Franz Winterhalter court painter style, regal atmosphere,
painted light rays emanating outward, gilded dust particles,
ornate baroque gold frame surrounding scene, slow regal motion
```

**Negative Prompt:**
```
worst quality, low quality, blurry, distorted, deformed,
ugly, bad anatomy, watermark, signature, text, logo,
photorealistic, 3D render, CGI, modern aesthetic,
cartoon, anime, flat lighting, asymmetrical, rushed motion
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

## Prompt Enhancement Tags

### Quality Boosters (add to positive)
```
masterpiece, best quality, highly detailed, 
professional, cinematic lighting, 8k quality
```

### Oil Painting Style Tags
```
oil painting style, visible brushstrokes, impasto texture,
canvas texture, layered glazing, classical painting technique
```

### Motion Tags
```
slow motion, elegant movement, smooth animation,
gentle flowing motion, cinematic movement
```

### Lighting Tags
```
chiaroscuro lighting, dramatic shadows, warm candlelight,
golden hour lighting, Rembrandt lighting, museum lighting
```

---

## Workflow Tips for ComfyUI

1. **Start with 512x512** at 49 frames to test prompts
2. **Increase to 768x768** once happy with composition
3. **Use 81 frames** for smoother loops
4. **CFG 6-7** works best for Wan - higher can cause artifacts
5. **Add motion keywords** to control animation speed
6. **Loop setting** - ensure first/last frames can blend

### Recommended Workflow Order:
```
Text Encode → Wan T2V Sampler → Video Decode → Save Video (GIF/MP4)
```

### For Seamless Loops:
- Use frame interpolation node after generation
- Or regenerate with "seamless loop" in prompt
- Post-process with RIFE for smoother results

---

## Color Reference (for prompt fine-tuning)

| Element | Description for Prompt |
|---------|----------------------|
| Curtain | "deep burgundy velvet", "wine-red fabric", "crimson velvet" |
| Gold | "antique gold", "warm amber gold", "gilded accents" |
| Light | "warm candlelight", "amber glow", "golden rays" |
| Shadow | "deep umber shadows", "rich dark tones", "dramatic shadows" |
| Background | "dark ebony background", "museum darkness", "deep black" |

---

*Optimized for ComfyUI Wan 2.1/2.2 — 400 Club NFT Reveals*
