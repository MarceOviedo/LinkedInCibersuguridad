import React, { useState, useCallback } from 'react';
import Layout from './components/Layout';
import InputSection from './components/InputSection';
import ResultCard from './components/ResultCard';
import { PostMode, GeneratedPost } from './types';
import { generateContent } from './services/geminiService';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState<PostMode>(PostMode.SINGLE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [introText, setIntroText] = useState<string | null>(null);

  const parseContent = (rawText: string, currentMode: PostMode): { parsedPosts: GeneratedPost[], intro: string | null } => {
    if (currentMode === PostMode.SINGLE) {
      const cleanText = rawText.replace(/\[POST ÚNICO\]/i, '').trim();
      return {
        parsedPosts: [{
          id: 'single',
          title: 'Post Individual',
          content: cleanText
        }],
        intro: null
      };
    } else {
      // Series parsing
      // Split by the header regex
      const parts = rawText.split(/\[POST [1-3]\/3\]/g);
      
      // Check for the specific intro text in the first part
      let foundIntro = null;
      if (parts.length > 0 && parts[0].includes("Aquí tienes la serie")) {
        foundIntro = parts[0].trim();
      }

      // Filter for actual post content (ignore the preamble if it was just split out)
      // We look for parts that have substantial content
      const cleanParts = parts.map(p => p.trim()).filter(p => p.length > 20);

      // Assuming the format Intro [Post 1] [Post 2] [Post 3]
      // The split results in [Intro, Content1, Content2, Content3]
      // We want the last 3 parts.
      const postsToUse = cleanParts.length >= 3 ? cleanParts.slice(-3) : cleanParts;

      const defaultTitles = [
        "Post 1: Introducción",
        "Post 2: Desarrollo",
        "Post 3: Conclusión"
      ];

      const parsedPosts = postsToUse.map((part, index) => ({
        id: `series-${index}`,
        title: defaultTitles[index] || `Post ${index + 1}`,
        content: part
      }));

      return { parsedPosts, intro: foundIntro };
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);
    setPosts([]);
    setIntroText(null);

    try {
      const rawContent = await generateContent(topic, mode);
      const { parsedPosts, intro } = parseContent(rawContent, mode);
      setPosts(parsedPosts);
      setIntroText(intro);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al generar el contenido. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }, [topic, mode]);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Generador de Posts Expertos</h2>
          <p className="text-slate-600">
            Crea contenido viral de Ciberseguridad y Tecnología en segundos.
            Elige entre un post único de impacto o una estrategia de 3 días.
          </p>
        </div>

        <InputSection
          topic={topic}
          mode={mode}
          isLoading={isLoading}
          onTopicChange={setTopic}
          onModeChange={setMode}
          onSubmit={handleGenerate}
        />

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3">
            <AlertCircle className="text-red-500 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-red-700">Error</h4>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {posts.length > 0 && (
          <div className="animate-fadeIn">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-slate-200 flex-grow"></div>
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Resultados Generados</span>
              <div className="h-px bg-slate-200 flex-grow"></div>
            </div>

            {introText && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-start gap-3">
                <CheckCircle2 className="text-green-600 mt-0.5 shrink-0" size={20} />
                <p className="text-green-800 font-medium">{introText}</p>
              </div>
            )}
            
            <div className={`grid gap-6 ${posts.length === 1 ? 'grid-cols-1 max-w-3xl mx-auto' : 'grid-cols-1 md:grid-cols-3'}`}>
              {posts.map((post) => (
                <ResultCard
                  key={post.id}
                  title={post.title}
                  content={post.content}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;