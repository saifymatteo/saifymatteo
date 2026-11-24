# Personal project photography and provenance

Only real project photographs are included. No stock, generated, or recreated imagery was used. No application files were changed for this asset collection.

## Processing

Downloaded original files and used installed `sharp`: auto-orient from EXIF, resize within **1400 × 1400**, preserve aspect ratio, never upscale, encode WebP at quality 82 / effort 6. Metadata is stripped by default. Dimensions below are actual output pixels; original dimensions are encoded JPEG dimensions before EXIF orientation. Browser paths are relative to `public`, e.g. `/assets/portfolios/keyboards/spender-finished.webp`.

## Keyboard photographs (six total)

Source repository: [saifymatteo/Keyboards](https://github.com/saifymatteo/Keyboards), pinned to commit [`241bb1c586180b641b879107ff38412cf00bcdff`](https://github.com/saifymatteo/Keyboards/tree/241bb1c586180b641b879107ff38412cf00bcdff). Project builder / repository author: **Saiful Mashuri (@saifymatteo)**. Photos are published in his own build documentation; no separate photographer credit was found.

All paths below start at `nextjs/public/assets/portfolios/keyboards/`.

| Asset                           | What is actually shown                                                                                                                              | Original source URL                                                                                                                                                              | Original → WebP dimensions |  Bytes |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -----: |
| `viktorpad-assembled.webp`      | Two assembled macropad fronts with keycaps and knobs; OLED windows appear empty, so this is not evidence of a fully operational finished OLED build | [Original JPEG](https://raw.githubusercontent.com/saifymatteo/Keyboards/241bb1c586180b641b879107ff38412cf00bcdff/viktorpad/images/PXL_20251127_150219403.jpg)                    | 4000 × 3000 → 1400 × 1050  | 250062 |
| `viktorpad-wiring.webp`         | Open case, hand-wired matrix and electronics; README labels this “full soldered - inside”                                                           | [Original JPEG](https://raw.githubusercontent.com/saifymatteo/Keyboards/241bb1c586180b641b879107ff38412cf00bcdff/viktorpad/images/PXL_20251209_125524822.jpg)                    | 4000 × 3000 → 1400 × 1050  | 184756 |
| `spender-finished.webp`         | Assembled ergonomic keyboard with keycaps                                                                                                           | [Original JPEG](https://raw.githubusercontent.com/saifymatteo/Keyboards/241bb1c586180b641b879107ff38412cf00bcdff/spender/images/PXL_20250216_155312548.jpg)                      | 4080 × 3072 → 1400 × 1054  | 288108 |
| `spender-wiring.webp`           | Close-up of hand-wired switch matrix inside case                                                                                                    | [Original JPEG](https://raw.githubusercontent.com/saifymatteo/Keyboards/241bb1c586180b641b879107ff38412cf00bcdff/spender/images/PXL_20250216_154624849.jpg)                      | 4080 × 3072 → 1400 × 1054  | 207902 |
| `tractyl-finished.webp`         | Complete split sculpted keyboard with integrated right-hand trackball and palm rests                                                                | [Original JPEG](https://raw.githubusercontent.com/saifymatteo/Keyboards/241bb1c586180b641b879107ff38412cf00bcdff/tractyl_manuster/images/PXL_20241107_162940886.jpg)             | 4080 × 3072 → 1400 × 1054  | 169152 |
| `tractyl-trackball-sensor.webp` | Trackball sensor board and hand-soldered wiring                                                                                                     | [Original JPEG](https://raw.githubusercontent.com/saifymatteo/Keyboards/241bb1c586180b641b879107ff38412cf00bcdff/tractyl_manuster/images/PXL_20250831_062650070.MACRO_FOCUS.jpg) | 4000 × 3000 → 1400 × 1050  | 100684 |

### Verified hardware and design attribution

- **ViktorPad:** [README](https://github.com/saifymatteo/Keyboards/blob/241bb1c586180b641b879107ff38412cf00bcdff/viktorpad/README.md) describes a custom 4×4 macropad, RP2040 Zero, four EC11 rotary encoders, 0.96-inch 128×64 I²C OLED, and says “Fully design by me.” The OLED specification describes intended hardware, not proof that the screen is installed in the selected front photograph.
- **Spender:** [README](https://github.com/saifymatteo/Keyboards/blob/241bb1c586180b641b879107ff38412cf00bcdff/spender/readme.md) lists Teensy++ 2.0 / AT90USB1286, EC11 encoder, 128×36 I²C OLED, passive piezo buzzer. User identifies Spender as an original design; README explicitly credits inspiration from [FSund/pteron-keyboard](https://github.com/FSund/pteron-keyboard). Preserve that inspiration credit rather than claiming it has no antecedents.
- **Tractyl Manuster:** [README](https://github.com/saifymatteo/Keyboards/blob/241bb1c586180b641b879107ff38412cf00bcdff/tractyl_manuster/README.md) lists RP2040, “PWM3360” sensor (README spelling), EC11 encoder, 128×36 I²C OLED, passive piezo buzzer, coin vibration motor. It credits [Schievel1/dactyl_manuform_r_track](https://github.com/Schievel1/dactyl_manuform_r_track) and [noahprince22/tractyl-manuform-keyboard](https://github.com/noahprince22/tractyl-manuform-keyboard), and recommends case STLs by **u/Tonehaven2**: [left](https://gitlab.com/keyboards1/dm_left/-/blob/master/boolean/left.stl), [right](https://gitlab.com/keyboards1/dm_r_track/-/blob/master/boolean/right.stl). Describe this as Saiful’s build/adaptation, not an entirely original keyboard design.

The root README and per-project documentation reference **QMK** and **Vial** firmware. These are physical hand-wired builds with firmware and case design files, not just renders.

### Keyboard source license

The repository [LICENSE](https://github.com/saifymatteo/Keyboards/blob/241bb1c586180b641b879107ff38412cf00bcdff/LICENSE) is **MIT**, copyright (c) 2025 Saiful Mashuri. No photo-specific license was found; repository-wide license is the only explicit source license. Upstream Tractyl/Pteron design licenses were not audited or imported by this photography-only task.

MIT notice retained here:

> Copyright (c) 2025 Saiful Mashuri
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## CAD: original kitchen rack (two photographs)

Source: [Kitchen Silverware Dry Hanging Bin Rack](https://makerworld.com/en/models/2942296-kitchen-silverware-dry-hanging-bin-rack#profileId-3295426), by [saifymatteo](https://makerworld.com/en/@saifymatteo). The public page names this author and presents these photographs in its main design gallery, not another user’s review. This is the user’s original CAD design.

All paths below start at `nextjs/public/assets/portfolios/cad/`.

| Asset                         | Subject                                                         | Original source URL                                                                                         | Original → WebP dimensions             | Bytes |
| ----------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------- | ----: |
| `kitchen-rack-installed.webp` | Two printed honeycomb bins holding utensils on the kitchen rack | [Original JPEG](https://makerworld.bblmw.com/makerworld/model/USc46fab8f5bfd49/design/24d5e67bfddd305f.jpg) | 1080 × 810 → 1080 × 810 (not upscaled) | 70084 |
| `kitchen-rack-detail.webp`    | Printed bin and separate mounting hook laid out on a table      | [Original JPEG](https://makerworld.bblmw.com/makerworld/model/USc46fab8f5bfd49/design/227c110d67716bfd.jpg) | 4000 × 3000 → 1400 × 1050              | 48998 |

Page describes three heights (**80, 100, 120 mm**), **one hook per bin**, default hook mounting size **16 × 30.5 mm**, somewhat parametric model, **Fusion and STEP files** provided. Designer print profile: 0.2 mm layers, two walls, 15% infill, PLA.

Displayed license: **[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)**. Attribute “Kitchen Silverware Dry Hanging Bin Rack — Saiful Mashuri / saifymatteo,” link the model and license, and note that these copies were resized and converted to WebP. No separate photographer credit was found. This collection uses the owner’s own published work; it does not assert a broader commercial license for third-party reuse.

## CAD: AMS higher-clearance modification — no image imported

Requested profile: [AMS Flipper profile 2574168](https://makerworld.com/en/models/1363398-ams-flipper-better-access-to-your-p1s-x1-p2s#profileId-2574168).

The parent **AMS Flipper** design is by **[Jakob_K_Design](https://makerworld.com/en/@Jakob_K_Design)**, not Saiful. Its public gallery belongs to that parent designer. The user’s contribution is a **higher-clearance modification**, not the original flipper mechanism. Parent page displays **Standard Digital File License**; do not assume MIT/Creative Commons permission for parent photographs or design files.

Direct browser and HTTP access encountered Cloudflare security verification. A public reader recovered the parent page, its author, gallery and license, but did **not** expose the requested profile’s author-specific photo or modification details. No gallery/review image could be reliably tied to Saiful’s profile 2574168. Consequently **no AMS photograph was copied**, and no parent photo is misrepresented as the user’s modification. Exact modified clearance dimensions remain unverified. This should not block use of the verified keyboard and rack photos.

### Retrieval and verification notes

GitHub metadata and READMEs were read with `gh api`. MakerWorld gallery URLs/credits/licenses were recovered through public reader views of the exact model URLs (`https://r.jina.ai/https://makerworld.com/en/models/2942296-kitchen-silverware-dry-hanging-bin-rack` and `https://r.jina.ai/https://makerworld.com/en/models/1363398-ams-flipper-better-access-to-your-p1s-x1-p2s%23profileId-2574168`), after browser verification blocked direct viewing. Originals were downloaded from their actual GitHub/CDN URLs, not screenshots of unrelated projects. All eight outputs were decoded with `sharp`, checked for WebP format and maximum dimensions, and visually inspected for subject and attribution fit. No application build is needed for this static-assets-only change.
