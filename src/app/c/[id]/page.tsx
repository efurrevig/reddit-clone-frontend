


export default function Page({ params }: { params: { id: number }}) {

    return (
        <div>
            <div>{params.id}</div>
        </div>
    )
}