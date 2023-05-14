import Menu from '@/components/Menu'
export default function DefaultLayout({ children }: {
      children: React.ReactNode
}) {
      return (
            <div>
                  <Menu />
                  {children}
            </div>
      )
}