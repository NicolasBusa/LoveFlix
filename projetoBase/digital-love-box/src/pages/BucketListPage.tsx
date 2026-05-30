import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BucketList from '@/components/BucketList';
import FloatingHearts from '@/components/FloatingHearts';

const BucketListPage = () => (
  <div className="min-h-screen bg-background text-foreground paper-texture relative overflow-hidden pb-24">
    <FloatingHearts />
    <div className="relative z-10 max-w-xl mx-auto px-6 pt-10 space-y-8">
      <Link to="/" className="inline-flex items-center gap-2 font-handwritten text-lg text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={18} /> Voltar
      </Link>
      <BucketList />
    </div>
  </div>
);

export default BucketListPage;
