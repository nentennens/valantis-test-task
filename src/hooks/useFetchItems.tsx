import { useEffect, useRef, useState } from 'react'
import { MD5 } from 'crypto-js'
import { TItem } from '../types'

const apiUrl = 'http://api.valantis.store:40000/'
const apiPassword = 'Valantis'

const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')

const headers = {
	'X-Auth': String(MD5(apiPassword + '_' + timestamp)),
	'Content-Type': 'application/json'
}

interface Props {
	page: number
	filterValue: string
	selectedFilter: string
	itemsPerPage: number
}

export function useFetchItems({ page, filterValue, selectedFilter, itemsPerPage }: Props) {
	const [items, setItems] = useState<TItem[]>([])
	const [isLoading, setLoading] = useState(false)
	const [error, setError] = useState<unknown>()

	const abortControllerRef = useRef<AbortController>()

	async function fetchItems() {
		setLoading(true)
		setItems([])

		abortControllerRef.current?.abort()
		abortControllerRef.current = new AbortController()

		try {
			const idsResponse = await fetch(apiUrl, {
				signal: abortControllerRef.current?.signal,
				method: 'POST',
				body: JSON.stringify({
					action: filterValue ? 'filter' : 'get_ids',
					params: filterValue
						? { [selectedFilter]: selectedFilter === 'price' ? Number(filterValue) : filterValue }
						: { offset: itemsPerPage * (page - 1), limit: itemsPerPage }
				}),
				headers
			})
			const ids = await idsResponse.json()

			const itemsResponse = await fetch(apiUrl, {
				signal: abortControllerRef.current?.signal,
				method: 'POST',
				body: JSON.stringify({
					action: 'get_items',
					params: filterValue
						? { ids: ids.result.slice(itemsPerPage * (page - 1), itemsPerPage * page) }
						: { ids: ids.result }
				}),
				headers
			})
			const items = await itemsResponse.json()

			const uniqueItems = new Set()
			const filteredItems = items.result.filter((item: TItem) => {
				if (uniqueItems.has(item.id)) return false
				uniqueItems.add(item.id)
				return true
			})

			setItems(filteredItems)
			setLoading(false)
			setError(null)
		} catch (e: any) {
			if (e.name === 'AbortError') return
			console.error('Failed to fetch items:', e)
			setError(e)
			setTimeout(fetchItems, 2000)
		}
	}

	function updateItems() {
		fetchItems()
	}

	useEffect(() => {
		fetchItems()
	}, [page])

	return { items, isLoading, error, updateItems }
}
