import { Input } from '../ui/input/input'

export function Search() {
    return (
        <div>
            <Input id='search' placeholder='Город или район' classes={['search-input']} />
        </div>
    )
}
