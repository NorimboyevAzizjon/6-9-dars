import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t bg-background py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TechStore. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Maxfiylik siyosati</a>
            <a href="#" className="hover:text-foreground transition-colors">Foydalanish shartlari</a>
            <a href="#" className="hover:text-foreground transition-colors">Bog'lanish</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
