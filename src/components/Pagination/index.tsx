import { LeftArrow, RightArrow } from '../../icons'
import styles from './Pagination.module.css'

interface Props {
	changePage: (page: number) => void
	page: number
}

export default function Pagination({ changePage, page }: Props) {
	return (
		<div className={styles.pagination}>
			<button onClick={() => changePage(page - 1)} className={styles.pagination__btn}>
				<LeftArrow className={styles['pagination__btn-svg']} />
			</button>

			<span className={styles.pagination__count}>{page}</span>

			<button onClick={() => changePage(page + 1)} className={styles.pagination__btn}>
				<RightArrow className={styles['pagination__btn-svg']} />
			</button>
		</div>
	)
}
