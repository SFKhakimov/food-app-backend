import { QueryPaginationInterface } from 'common/types/query.interface'

export interface QueryRecipesInterface extends QueryPaginationInterface {
    author?: string
    categories?: string[]
    my?: boolean
}
