import { SiteHeader } from '@/components/site-header';
import { EntryForm } from '@/components/entry-form';

export default function RecaudacionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader title="Ingresar Recaudación" />
      <main className="flex-1 container max-w-screen-2xl p-4 md:p-8">
        <EntryForm
          title="Nueva Recaudación"
          description="Registre los ingresos generados por sus ventas."
          buttonLabel="Guardar Recaudación"
          toastMessage="La recaudación ha sido guardada correctamente."
        />
      </main>
    </div>
  );
}
