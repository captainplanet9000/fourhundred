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
an oil painting on canvas coming to life, traditional oil painting, 
thick impasto brushstrokes, visible paint texture throughout,
burgundy velvet curtains slowly parting from center,
heavy palette knife strokes creating fabric folds,
cracked aged varnish surface, canvas weave texture visible,
golden light painted with yellow ochre and cadmium pigments,
ornate gold leaf tassels, dramatic Rembrandt chiaroscuro,
warm umber and sienna undertones, painted dust motes,
classical museum painting aesthetic, gilt baroque frame edge visible,
the painting breathes and moves, brushstrokes shimmer with life,
19th century academic art style, slow dreamlike motion
```

**Negative Prompt:**
```
photorealistic, photograph, photo, realistic, 3D render, CGI, 
digital art, smooth gradients, clean lines, sharp edges,
video footage, film grain, camera movement, lens flare,
plastic, glossy, modern, contemporary, minimalist,
cartoon, anime, vector art, flat colors, cel shading,
worst quality, low quality, blurry, watermark, text
```

---

## Prompt 2: Dark Velvet Drape Unveiling

**Positive Prompt:**
```
a living oil painting, painted on stretched linen canvas,
dark velvet drape being drawn aside in paint strokes,
deep burnt umber and alizarin crimson pigments,
visible woven canvas texture beneath paint layers,
heavy impasto creating three-dimensional fabric folds,
golden highlights in Naples yellow and gold ochre,
antique craquelure cracks in aged oil paint surface,
Rembrandt van Rijn technique, glazed varnish sheen,
Old Masters museum piece coming alive,
raw sienna and Van Dyke brown shadows,
the painted scene slowly animates, painterly motion
```

**Negative Prompt:**
```
photorealistic, photograph, photo, realistic, 3D render, CGI, 
digital art, smooth gradients, clean lines, sharp edges,
video footage, film grain, camera movement, lens flare,
plastic, glossy, modern, contemporary, minimalist,
cartoon, anime, vector art, flat colors, cel shading,
worst quality, low quality, blurry, watermark, text
```

---

## Prompt 3: Grand Theater Curtain Opening

**Positive Prompt:**
```
a grand oil painting hanging in a museum coming to life,
19th century French Academic painting style,
ornate theater curtains rendered in cadmium red and carmine,
elaborate brushwork visible in every fold and drape,
gold embroidery painted with actual gold leaf pigment,
massive tassels in thick impasto yellow ochre,
titanium white and cadmium yellow light rays,
William-Adolphe Bouguereau technique, proscenium arch in frame,
painted on fine Belgian linen canvas, visible weave,
cracked antique varnish, museum lighting on paint surface,
the masterwork slowly breathes, oil paint texture throughout
```

**Negative Prompt:**
```
photorealistic, photograph, photo, realistic, 3D render, CGI, 
digital art, smooth gradients, clean lines, sharp edges,
video footage, film grain, camera movement, lens flare,
plastic, glossy, modern, contemporary, minimalist,
cartoon, anime, vector art, flat colors, cel shading,
worst quality, low quality, blurry, watermark, text
```

---

## Prompt 4: Intimate Portrait Curtain

**Positive Prompt:**
```
extreme close-up of an oil painting's surface,
painted velvet curtain corner in alizarin crimson and ivory black,
you can see individual bristle marks from the brush,
thick buttery oil paint with visible palette knife work,
the painting surface has depth and texture,
cadmium orange and burnt sienna in the folds,
single golden tassel painted in impasto gold ochre,
John Singer Sargent alla prima technique,
aged canvas with fine craquelure pattern,
amber damar varnish catching gallery light,
the paint itself seems to move and breathe,
intimate museum viewing distance, ultra detailed brushwork
```

**Negative Prompt:**
```
photorealistic, photograph, photo, realistic, 3D render, CGI, 
digital art, smooth gradients, clean lines, sharp edges,
video footage, film grain, camera movement, lens flare,
plastic, glossy, modern, contemporary, minimalist,
cartoon, anime, vector art, flat colors, cel shading,
worst quality, low quality, blurry, watermark, text
```

---

## Prompt 5: Royal Presentation Curtains

**Positive Prompt:**
```
a royal court painting coming alive on its canvas,
symmetrical presentation curtains in Venetian red and madder lake,
ermine fur trim rendered in lead white and raw umber stippling,
elaborate gold fringe painted with shell gold and yellow ochre,
royal crown motif in genuine gold leaf application,
majestic light in cadmium lemon and titanium white,
Franz Xaver Winterhalter court painter technique,
painted on museum-quality stretched canvas,
ornate baroque gilt frame visible at edges,
centuries-old craquelure in the paint surface,
the royal painting stirs to life, painterly texture throughout,
slow regal motion as if the painting dreams
```

**Negative Prompt:**
```
photorealistic, photograph, photo, realistic, 3D render, CGI, 
digital art, smooth gradients, clean lines, sharp edges,
video footage, film grain, camera movement, lens flare,
plastic, glossy, modern, contemporary, minimalist,
cartoon, anime, vector art, flat colors, cel shading,
worst quality, low quality, blurry, watermark, text
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

### Oil Painting Must-Haves (add to every prompt)
```
oil painting on canvas, visible brushstrokes, thick impasto,
canvas weave texture, craquelure, aged varnish surface,
traditional oil painting, the painting comes alive
```

### Specific Pigment Names (for authenticity)
```
cadmium red, alizarin crimson, burnt umber, raw sienna,
yellow ochre, Naples yellow, titanium white, ivory black,
Van Dyke brown, Venetian red, cadmium orange, gold ochre
```

### Painting Technique Terms
```
impasto, alla prima, glazing technique, scumbling,
palette knife strokes, visible bristle marks, layered paint,
wet-on-wet, sfumato, chiaroscuro
```

### Canvas & Surface Tags
```
stretched linen canvas, Belgian linen, canvas weave visible,
cracked varnish, antique craquelure, damar varnish sheen,
museum-quality canvas, aged paint surface
```

### "Living Painting" Motion Tags
```
the painting breathes, oil paint animating, painterly motion,
brushstrokes shimmer, the masterwork comes alive,
dreaming painting, paint surface undulating slowly
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
