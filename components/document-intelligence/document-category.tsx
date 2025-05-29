import { DocumentCard, type DocumentCardProps } from "./document-card"

interface DocumentCategoryProps {
  title: string
  documents: DocumentCardProps[]
}

export function DocumentCategory({ title, documents }: DocumentCategoryProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#001742] mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} {...doc} />
        ))}
      </div>
    </div>
  )
}
