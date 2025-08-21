import os
from pydub import AudioSegment
import random

# Folder where your predefined BGMs are stored
BGM_FOLDER = os.path.join(os.path.dirname(__file__), 'assets', 'bgms')

def process_audio(voice_file, num_bgms=1, wish_name=None, extra_seconds=5):
    """
    Mixes an uploaded voice recording with exactly `num_bgms` selected BGMs sequentially,
    extends the BGM slightly after the voice ends (5 sec), and applies a fade-out at the end.
    Keeps the BGM stable and smooth so the voice is clearly audible.
    
    Parameters:
    - voice_file: uploaded voice file (Flask FileStorage)
    - num_bgms: number of BGMs to apply (1, 2, or 3)
    - wish_name: optional filename for the output audio
    - extra_seconds: additional seconds of BGM after voice ends (default 5)
    
    Returns:
    - Path to the final edited audio file
    """

    # ------------------------
    # 1. Save voice temporarily
    # ------------------------
    extension = voice_file.filename.split('.')[-1]
    voice_path = f'temp_voice.{extension}'
    voice_file.save(voice_path)
    voice_audio = AudioSegment.from_file(voice_path)

    # Measure voice RMS
    voice_rms = voice_audio.rms

    # ------------------------
    # 2. Select exactly num_bgms BGMs
    # ------------------------
    all_bgms = [os.path.join(BGM_FOLDER, f) for f in os.listdir(BGM_FOLDER) if f.endswith('.mp3')]
    if len(all_bgms) < num_bgms:
        raise ValueError(f"Not enough BGMs in the folder. Found {len(all_bgms)}, required {num_bgms}.")
    
    selected_bgms = random.sample(all_bgms, num_bgms)

    # ------------------------
    # 3. Concatenate BGMs sequentially
    # ------------------------
    bgm_sequence = AudioSegment.silent(duration=0)
    for bgm_path in selected_bgms:
        bgm_audio = AudioSegment.from_file(bgm_path)
        # Normalize BGM to a fixed level below voice RMS
        bgm_rms = bgm_audio.rms
        if bgm_rms > 0:
            target_reduction = 10 + (bgm_rms - voice_rms) / 1000  # ensure BGM ~10 dB below voice
            bgm_audio = bgm_audio - target_reduction
        else:
            bgm_audio = bgm_audio - 15
        bgm_audio = bgm_audio.fade_in(1000).fade_out(1000)
        bgm_sequence += bgm_audio

    # ------------------------
    # 4. Trim or loop BGM to match voice length + extra_seconds
    # ------------------------
    total_length = len(voice_audio) + (extra_seconds * 1000)
    if len(bgm_sequence) < total_length:
        times = int(total_length / len(bgm_sequence)) + 1
        bgm_sequence = bgm_sequence * times
    bgm_sequence = bgm_sequence[:total_length]

    # ------------------------
    # 5. Overlay voice on top of BGM
    # ------------------------
    final_audio = bgm_sequence.overlay(voice_audio)

    # ------------------------
    # 6. Apply fade-in and fade-out (extra_seconds)
    # ------------------------
    final_audio = final_audio.fade_in(2000).fade_out(extra_seconds * 1000)

    # ------------------------
    # 7. Export final audio
    # ------------------------
    if wish_name and wish_name.strip() != '':
        safe_name = "".join(c for c in wish_name if c.isalnum() or c in (' ', '_', '-')).rstrip()
        output_path = f"{safe_name}.mp3"
    else:
        output_path = 'edited_wish.mp3'

    final_audio.export(output_path, format='mp3')

    return output_path
