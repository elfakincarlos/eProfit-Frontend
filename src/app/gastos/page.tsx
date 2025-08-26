import { SiteHeader } from '@/components/site-header';
import { EntryForm } from '@/components/entry-form';

export default function GastosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader title="Ingresar Gastos" />
      <main className="flex-1 container max-w-screen-2xl p-4 md:p-8">
        <EntryForm
          title="Nuevo Gasto"
          description="Registre el costo de sus productos o servicios."
          buttonLabel="Guardar Gasto"
          toastMessage="El gasto ha sido guardado correctamente."
        />
      </main>
    </div>
  );
}
