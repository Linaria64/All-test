import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface ApiConfig {
  endpoint: string;
  model: string;
  temperature: number;
}

interface ChatBotConfigProps {
  isOpen: boolean;
  onClose: () => void;
  config: ApiConfig;
  onSave: (config: ApiConfig) => void;
}

const SAMPLE_MODELS = [
  "gemma3:1b",  // Modèle par défaut en premier
  "gemma3",
  "gemma3:2b",
  "gemma3:7b",
  "llama3", 
  "llama3:8b",
  "llama3:70b",
  "mistral", 
  "mixtral", 
  "phi3", 
  "codellama", 
  "llama2",
  "custom"
];

const ChatBotConfig = ({ isOpen, onClose, config, onSave }: ChatBotConfigProps) => {
  const [localConfig, setLocalConfig] = useState<ApiConfig>({ ...config });
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [testMessage, setTestMessage] = useState("");
  const [customModel, setCustomModel] = useState("");

  const handleSave = () => {
    // Si on utilise un modèle personnalisé, utiliser cette valeur
    if (localConfig.model === "custom" && customModel.trim()) {
      onSave({...localConfig, model: customModel.trim()});
    } else {
      onSave(localConfig);
    }
    onClose();
  };

  const testConnection = async () => {
    setTestStatus("testing");
    setTestMessage("Test de connexion à Ollama en cours...");
    
    try {
      // Détermine le modèle à tester
      const modelToTest = localConfig.model === "custom" && customModel.trim() 
        ? customModel.trim() 
        : localConfig.model;
        
      console.log(`Test connection to Ollama at ${localConfig.endpoint} with model ${modelToTest}`);
      
      const response = await fetch(localConfig.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: modelToTest,
          prompt: "test",
          stream: false
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Ollama test response:", data);
        setTestStatus("success");
        setTestMessage(`Connexion réussie au modèle "${modelToTest}"`);
      } else {
        const errorText = await response.text();
        console.error(`Ollama error: ${response.status} ${response.statusText}`, errorText);
        setTestStatus("error");
        setTestMessage(`Échec de connexion: ${response.status} ${response.statusText}. Vérifiez qu'Ollama est en cours d'exécution et que le modèle "${modelToTest}" est disponible.`);
      }
    } catch (error: unknown) {
      console.error("Test connection error:", error);
      setTestStatus("error");
      setTestMessage(`Erreur de connexion: ${error instanceof Error ? error.message : "Erreur inconnue"}. Vérifiez qu'Ollama est en cours d'exécution.`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal overlay with glass effect */}
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#1a2b4b]/30 via-[#30175f]/20 to-[#1a2b4b]/30 blur-md opacity-60"></div>
      <div className="glass rounded-xl bg-[#0d1321]/70 backdrop-blur-lg border border-white/10 shadow-xl w-[90%] max-w-md p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-white">Options du modèle IA</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Instructions */}
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4">
            <h3 className="text-sm font-medium text-white mb-2">Modèle par défaut: Gemma 3 1B</h3>
            <p className="text-xs text-white/80">
              Si le modèle par défaut ne fonctionne pas, assurez-vous qu'Ollama est installé et exécutez:
              <code className="block bg-black/20 p-1 rounded mt-1 mb-1">ollama pull gemma3:1b</code>
            </p>
          </div>

          {/* Model selection */}
          <div className="space-y-2">
            <Label htmlFor="model" className="text-white">Changer de modèle</Label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_MODELS.map(model => (
                <button
                  key={model}
                  onClick={() => setLocalConfig({ ...localConfig, model })}
                  className={`px-3 py-1.5 rounded-md text-xs ${
                    localConfig.model === model 
                      ? "bg-[#30175f] text-white" 
                      : model === "gemma3:1b" 
                        ? "bg-[#1a2b4b]/50 text-white/90 border border-[#30175f]/50"
                        : "bg-[#1a2b4b]/30 text-white/70 hover:bg-[#1a2b4b]/50"
                  } transition-colors`}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          {/* Custom model input */}
          {localConfig.model === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="custom-model" className="text-white">Nom du modèle personnalisé</Label>
              <Input
                id="custom-model"
                placeholder="Entrez le nom exact du modèle (ex: llama3)"
                className="glass border-white/10 bg-black/20"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
              />
            </div>
          )}

          {/* Endpoint URL */}
          <div className="space-y-2">
            <Label htmlFor="endpoint" className="text-white">URL de l'endpoint</Label>
            <Input
              id="endpoint"
              placeholder="http://localhost:11434/api/generate"
              className="glass border-white/10 bg-black/20"
              value={localConfig.endpoint}
              onChange={(e) => setLocalConfig({ ...localConfig, endpoint: e.target.value })}
            />
            <p className="text-xs text-white/50">
              Ne modifiez cette valeur que si vous savez ce que vous faites.
            </p>
          </div>

          {/* Temperature slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="temperature" className="text-white">Température</Label>
              <span className="text-sm text-white/70">{localConfig.temperature.toFixed(1)}</span>
            </div>
            <input
              id="temperature"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={localConfig.temperature}
              onChange={(e) => setLocalConfig({ 
                ...localConfig, 
                temperature: parseFloat(e.target.value) 
              })}
              className="w-full h-2 bg-[#1a2b4b]/40 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-white/50">
              <span>Précis</span>
              <span>Créatif</span>
            </div>
          </div>

          {/* Test connection result */}
          {testStatus !== "idle" && (
            <div className={`p-3 rounded-lg text-sm 
              ${testStatus === "testing" ? "bg-[#1a2b4b]/40" : 
                testStatus === "success" ? "bg-green-500/20 border border-green-500/30" : 
                "bg-red-500/20 border border-red-500/30"}`}
            >
              {testMessage}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-between mt-6">
            <Button 
              onClick={testConnection} 
              variant="outline" 
              className="glass border-white/20 hover:bg-[#1a2b4b]/40"
              disabled={testStatus === "testing"}
            >
              Tester la connexion
            </Button>
            
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-[#1a2b4b] via-[#30175f] to-[#1a2b4b] hover:opacity-90"
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotConfig; 