import { useState } from 'react'

import Header from './components/Header'
import StatusHandler from './components/StatusHandler'
import Items from './components/Items'
import Pagination from './components/Pagination'

import { useFetchItems } from './hooks/useFetchItems'

import styles from './App.module.css'

export function App() {
	const searchParams = new URLSearchParams(location.search)

    const [page, setPage] = useState(Number(searchParams.get('page') ?? 1))
	const itemsPerPage = 50

	const [selectedFilter, setSelectedFilter] = useState(searchParams.get('filter') ?? 'product')
	const [filterValue, setFilterValue] = useState(searchParams.get('value') ?? '')

	const { items, isLoading, error, updateItems } = useFetchItems({
		page,
		selectedFilter,
		filterValue,
		itemsPerPage
	})

	function changePage(page: number) {
		if (page < 1) return
		searchParams.set('page', String(page))
		setPage(page)
		const updatedUrl = location.origin + location.pathname + '?' + String(searchParams)
		history.replaceState({}, '', updatedUrl)
	}

	function resetFilters() {
		setFilterValue('')
		searchParams.delete('filter')
		searchParams.delete('value')
		changePage(1)
		updateItems()
	}

	return (
		<>
			<Header 
				searchParams={searchParams}
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				filterValue={filterValue}
				setFilterValue={setFilterValue}
				changePage={changePage}
				updateItems={updateItems}
			/>

			<div className={styles.content}>
				<StatusHandler
					error={error}
					isLoading={isLoading}
					itemsLength={items.length}
					resetFilters={resetFilters}
				/>

				<Items items={items} itemsPerPage={itemsPerPage} page={page} />
			</div>

			<Pagination changePage={changePage} page={page} />
		</>
	)
}
