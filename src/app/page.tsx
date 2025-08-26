import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, DollarSign } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
          eProfit
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">
          Controle sus finanzas. Registre gastos e ingresos para visualizar la rentabilidad de su negocio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/gastos" passHref>
            <Button size="lg" className="w-full sm:w-auto">
              <DollarSign className="mr-2 h-5 w-5" />
              Ingresar gastos
            </Button>
          </Link>
          <Link href="/recaudacion" passHref>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Ingresar recaudación
            </Button>
          </Link>
          <Link href="/profit" passHref>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <BarChart2 className="mr-2 h-5 w-5" />
              Ver Profit
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
