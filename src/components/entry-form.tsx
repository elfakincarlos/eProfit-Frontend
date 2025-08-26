"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DatePicker } from "@/components/ui/date-picker"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  date: z.date({
    required_error: "Se requiere una fecha.",
  }),
  product1: z.coerce.number().min(0, "Debe ser un número positivo."),
  product2: z.coerce.number().min(0, "Debe ser un número positivo."),
  product3: z.coerce.number().min(0, "Debe ser un número positivo."),
})

interface EntryFormProps {
  title: string
  description: string
  buttonLabel: string
  toastMessage: string
}

export function EntryForm({ title, description, buttonLabel, toastMessage }: EntryFormProps) {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product1: 0,
      product2: 0,
      product3: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send the data to your backend
    console.log(values)
    toast({
      title: "Éxito",
      description: toastMessage,
    })
    router.push('/profit')
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <DatePicker date={field.value} setDate={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="product1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Producto 1</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} step="0.01" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Producto 2</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} step="0.01" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Producto 3</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} step="0.01" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" size="lg" className="w-full sm:w-auto">{buttonLabel}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
