"use client"

import { useState, useMemo, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { format, subDays, isSameDay, startOfWeek, endOfWeek } from "date-fns"
import { es } from "date-fns/locale"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DatePicker } from "@/components/ui/date-picker"
import { Button } from "@/components/ui/button"

const generateMockData = () => {
  const data = []
  for (let i = 6; i >= 0; i--) {
    const date = subDays(new Date(), i)
    const revenue = Math.floor(Math.random() * (1500 - 500 + 1) + 500)
    const expenses = Math.floor(Math.random() * (revenue * 0.7 - 200 + 1) + 200)
    const profit = revenue - expenses
    data.push({
      date: format(date, "yyyy-MM-dd"),
      shortDate: format(date, "d MMM", { locale: es }),
      revenue,
      expenses,
      profit
    })
  }
  return data
}

const chartConfig = {
  revenue: { label: "Recaudación", color: "hsl(var(--chart-1))" },
  expenses: { label: "Gastos", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig

export function ProfitDashboard() {
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [searchDate, setSearchDate] = useState<Date | undefined>()
  const [searchResult, setSearchResult] = useState<{ profit: number; date: string } | null | "not_found">(null)
  
  useEffect(() => {
    setWeeklyData(generateMockData());
  }, []);

  const handleSearch = () => {
    if (!searchDate) return
    const foundData = weeklyData.find(d => isSameDay(new Date(d.date), searchDate))
    if (foundData) {
      setSearchResult({ profit: foundData.profit, date: format(searchDate, "PPP", { locale: es }) })
    } else {
      setSearchResult("not_found")
    }
  }

  const { totalProfit, totalRevenue, totalExpenses } = useMemo(() => {
    return weeklyData.reduce((acc, curr) => {
        acc.totalProfit += curr.profit;
        acc.totalRevenue += curr.revenue;
        acc.totalExpenses += curr.expenses;
        return acc;
    }, { totalProfit: 0, totalRevenue: 0, totalExpenses: 0 });
  }, [weeklyData]);

  if (weeklyData.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ganancia Semanal</CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-success">{`$${totalProfit.toLocaleString('es-ES')}`}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recaudación Semanal</CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold" style={{color: 'hsl(var(--chart-1))'}}>{`$${totalRevenue.toLocaleString('es-ES')}`}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gastos Semanales</CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold" style={{color: 'hsl(var(--chart-2))'}}>{`$${totalExpenses.toLocaleString('es-ES')}`}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Rendimiento Semanal</CardTitle>
          <CardDescription>Recaudación vs. Gastos en los últimos 7 días.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
                <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="shortDate" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${Number(value)/1000}k`} />
                  <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Desglose Diario</CardTitle>
            <CardDescription>Resumen financiero de los últimos 7 días.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
            {weeklyData.slice().reverse().map((day) => (
              <div key={day.date} className="p-3 rounded-md bg-card-foreground/5 space-y-1">
                <p className="font-semibold">{format(new Date(day.date), "eeee, d 'de' MMMM", { locale: es })}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ganancia:</span>
                  <span className="font-medium text-success">{`$${day.profit.toLocaleString('es-ES')}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Recaudación:</span>
                  <span className="font-medium">{`$${day.revenue.toLocaleString('es-ES')}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gastos:</span>
                  <span className="font-medium">{`$${day.expenses.toLocaleString('es-ES')}`}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Búsqueda por Fecha</CardTitle>
            <CardDescription>Encuentre el profit de un día específico.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-full sm:w-auto sm:flex-grow">
                <DatePicker date={searchDate} setDate={setSearchDate} />
              </div>
              <Button onClick={handleSearch} className="w-full sm:w-auto">Buscar</Button>
            </div>
            {searchResult && (
              <div className="mt-4 p-4 rounded-lg bg-card-foreground/5">
                {searchResult === 'not_found' ? (
                  <p className="text-center text-muted-foreground">No se encontraron datos para esta fecha.</p>
                ) : (
                  <div className="text-center">
                      <p className="text-muted-foreground">Ganancia para el {searchResult.date}:</p>
                      <p className="text-3xl font-bold text-success">{`$${searchResult.profit.toLocaleString('es-ES')}`}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
