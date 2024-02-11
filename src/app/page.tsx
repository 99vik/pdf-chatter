import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Page() {
  return (
    <div>
      <h1>Interact with your PDF documents instantly</h1>
      <p>
        PDF Chatter empowers you to engage with your documents like never
        before. Simply upload your PDF and delve into dynamic conversations with
        AI.
      </p>
      <Button>
        <ArrowRight />
        Button test
      </Button>
    </div>
  );
}
