type PageHeaderProps = {
  title: string
  description?: string
}

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold">{title}</h1>

      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

export default PageHeader