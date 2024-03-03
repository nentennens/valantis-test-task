import { useState } from 'react'
import { DownArrow, SearchSVG } from '../../icons'
import styles from './Header.module.css'

interface Props {
	searchParams: URLSearchParams
	selectedFilter: string
	setSelectedFilter: React.Dispatch<React.SetStateAction<string>>
	filterValue: string
	setFilterValue: React.Dispatch<React.SetStateAction<string>>
	changePage: (page: number) => void
	updateItems: () => void
}

export default function Header({
	searchParams,
	selectedFilter,
	setSelectedFilter,
	filterValue,
	setFilterValue,
	changePage,
	updateItems
}: Props) {
	const [isFilterWinOpen, setIsFilterWinOpen] = useState(false)

	function changeFilter() {
		if (filterValue) {
			searchParams.set('filter', selectedFilter)
			searchParams.set('value', filterValue)
		} else {
			searchParams.delete('filter')
			searchParams.delete('value')
		}

		changePage(1)
		updateItems()
	}

	return (
		<header className={styles.header}>
			<div className={styles.input__container}>
				<button
					onClick={() => setIsFilterWinOpen(!isFilterWinOpen)}
					className={styles['input__filter-btn']}
				>
					{isFilterWinOpen && (
						<div className={styles['input__filter-list']}>
							{['product', 'brand', 'price'].map(filter => (
								<p
									onClick={() => setSelectedFilter(filter)}
									className={`
										${styles['input__filter-option']}
										${filter === selectedFilter ? styles['input__filter-option--active'] : ''}
									`}
									key={filter}
								>
									{filter}
								</p>
							))}

						</div>
					)}

					{isFilterWinOpen && (
						<div
							onClick={() => setIsFilterWinOpen(false)}
							className={styles['input__filter-overlay']}
						/>
					)}

					{selectedFilter}
					<DownArrow
						className={`
							${styles['input__filter-svg']}
							${isFilterWinOpen ? styles['input__filter-svg--active'] : ''}
						`}
					/>
				</button>

				<input
					type='text'
					placeholder='Filter...'
					value={filterValue}
					onChange={e => setFilterValue(e.target.value)}
					onKeyDown={e => e.key === 'Enter' && changeFilter()}
					className={styles.input}
				/>

				<button onClick={changeFilter} className={styles['input__search-btn']}>
					<SearchSVG className={styles['input__search-svg']} />
				</button>
			</div>
		</header>
	)
}
