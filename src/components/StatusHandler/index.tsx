import styles from './StatusHandler.module.css'

interface Props {
	error: unknown
	isLoading: boolean
	itemsLength: number
	resetFilters: () => void
}

export default function StatusHandler({ error, isLoading, itemsLength, resetFilters }: Props) {
	if (error) return (
		<h1 className={styles['status-header']}>
			Something went wrong :( <br />
			Retrying...
		</h1>
	)

	if (isLoading) return (
		<h1 className={styles['status-header']}>Loading...</h1>
	)

	if (!isLoading && !itemsLength) return (
		<h1 className={styles['status-header']}>
			Nothing was found :( <br />
			Try to <span onClick={resetFilters} className={styles['reset-filters']}>reset filters</span>
		</h1>
	)
}
