# Blind Lawyer 

<p align="center">
  <img src="public/blindlawyer.png" alt="Blind Lawyer Logo" width="150" />
</p>

Blind Lawyer is a **private contract analysis tool** powered by Nillion's blind computation technology. It detects risky clauses, highlights negotiation opportunities, and protects you from unfair legal agreements. All while keeping your sensitive documents completely private and secure.

## Key Features
- **Secure Blind Analysis**: Leverages Nillion's blind computation [SecretLLM](https://docs.nillion.com/build/secretLLM/overview) module to analyze your contracts without exposing sensitive data.
- **Risky Clause Detection**: Identifies clauses in contracts that may pose risks or need careful consideration.
- **Negotiation Opportunities**: Highlights areas where you can negotiate better terms.
- **Unfair Agreements Detection**: Detects unfair terms that you shouldn't agree to.

## Technologies Used and Developed
- [**nilDocumind**](https://github.com/DocumindHQ/documind): A privacy-first toolkit for extracting structured data from uploaded contracts and legal agreements, ensuring sensitive information stays fully protected. This builds on top of [Documind](https://github.com/DocumindHQ/documind).
- **Analysis Engine**: Powered by Nillion’s blind computation [SecretLLM](https://docs.nillion.com/build/secretLLM/overview) module, now enhanced with:
  - [Gemma-3 4B model](https://huggingface.co/google/gemma-3-4b-it) for high-accuracy, fully private document analysis and image processing;
  - OpenAI’s beta [Structured Outputs API](https://openai.com/index/introducing-structured-outputs-in-the-api/) for precise, structured LLM responses.

## Requirements
Ensure the following dependencies are installed:

### Install System Dependencies
```bash
# On macOS
brew install ghostscript graphicsmagick

# On Debian/Ubuntu
sudo apt-get update
sudo apt-get install -y ghostscript graphicsmagick
```

### Others
- **Node.js** (18 or higher)
- **Npm**

## Getting Started

### Clone the Repo
```bash
git clone https://github.com/NillionNetwork/blindlawyer.git
cd ai-contract-analyzer
```

### Install Dependencies
Install the required dependencies using npm:
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory and configure the following variables:

```env
OPENAI_API_KEY=your_nilai_api_key
OPENAI_BASE_URL=https://test-nilrag.nilai.sandbox.nilogy.xyz
OPENAI_MODEL="google/gemma-3-4b-it"
```

**Note:** The Gemma-3 model is currently in beta and not yet available on public [nilAI Nodes](https://docs.nillion.com/network#nilai-nodes). You can trial it via the sandbox endpoint at `https://test-nilrag.nilai.sandbox.nilogy.xyz`. For access or feedback, please contact manuel.santos@nillion.com.

### Running the Tool Locally
1. **Run the Development Server**:
   Start the application locally:
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

## License
This project is open-source under the [MIT License](LICENSE).
