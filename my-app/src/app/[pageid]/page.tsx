

interface PageProps {
        params: {
            pageid: string;
        }
    }
export default function page({ params } : PageProps) {
    const Page_Id = params.pageid;
    let content;
    switch (Page_Id) {
        case '':
            content = <main> Home page </main>;
            break;
        case 'following':
            content = <main> Following Page </main>;
            break;
            default:
                break;
        }
    return (
        <main>
            <section>
                {content}
            </section>
        </main>
    )
}