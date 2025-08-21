from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from utils import process_audio
import os

app = Flask(__name__)
CORS(app)  # allow all origins (frontend can access)

@app.route('/edit-audio', methods=['POST'])
def edit_audio():
    try:
        # Get uploaded voice file
        voice = request.files.get('voice')
        if not voice:
            return jsonify({'error': 'No voice file uploaded'}), 400

        # Get number of BGMs to apply (default 1)
        num_bgms = int(request.form.get('num_bgms', 1))

        # Process audio with voice + selected number of BGMs
        output_path = process_audio(voice, num_bgms)

        # Serve the file directly so frontend can download
        if os.path.exists(output_path):
            return send_file(output_path, as_attachment=True)
        else:
            return jsonify({'error': 'Processed file not found'}), 500

    except Exception as e:
        print("Error processing audio:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run Flask backend on all interfaces for local testing
    app.run(host='0.0.0.0', port=5000, debug=True)
