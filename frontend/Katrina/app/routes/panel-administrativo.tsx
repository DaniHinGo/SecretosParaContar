import { useState } from "react"
import { BookOpen, Headphones, Heart, Home, LogOut, Menu, Settings, User, X, Gift } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"

export function AdminPanel() {
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-800 p-4 shadow-lg transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold">Mi Biblioteca</h1>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Inicio
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start bg-gray-100 dark:bg-gray-700" asChild>
            <a href="#" className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Mi Perfil
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#" className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Biblioteca
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#" className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración
            </a>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="#" className="flex items-center gap-2 text-red-500">
              <LogOut className="h-5 w-5" />
              Cerrar Sesión
            </a>
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 p-4 shadow">
          <div className="flex items-center justify-between">
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <h2 className="text-lg font-semibold">Panel de Administración</h2>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Usuario" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6">
          {/* Profile Section */}
          <section className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Mi Perfil</CardTitle>
                <CardDescription>Información personal y estadísticas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Usuario" />
                    <AvatarFallback className="text-2xl">US</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Carlos Rodríguez</h3>
                    <p className="text-gray-500 dark:text-gray-400">carlos.rodriguez@ejemplo.com</p>
                    <p className="text-sm">Miembro desde: Enero 2023</p>
                    <div className="flex gap-2">
                      <Button size="sm">Editar Perfil</Button>
                      <Button size="sm" variant="outline">
                        Cambiar Contraseña
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Metrics Section */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Mis Estadísticas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Desired Books */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Libros Deseados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Heart className="h-8 w-8 text-red-500 mr-4" />
                    <div>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">+3 este mes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Donations Made */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Donaciones Realizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Gift className="h-8 w-8 text-purple-500 mr-4" />
                    <div>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">+2 este mes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Books Read */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Libros Leídos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BookOpen className="h-8 w-8 text-green-500 mr-4" />
                    <div>
                      <p className="text-2xl font-bold">42</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">+5 este mes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Audiobooks Listened */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Audiolibros Escuchados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Headphones className="h-8 w-8 text-blue-500 mr-4" />
                    <div>
                      <p className="text-2xl font-bold">16</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">+1 este mes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

