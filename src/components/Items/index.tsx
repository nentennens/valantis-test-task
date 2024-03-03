import { TItem } from '../../types'
import styles from './Items.module.css'

interface Props {
	items: TItem[]
	itemsPerPage: number
	page: number
}

export default function Items({ items, itemsPerPage, page }: Props) {
	return (
		<div className={styles.items}>
			{items.map((item, i) => (
				<div className={styles.item} key={item.id}>
					<span className={styles.count}>
						{i + 1 + itemsPerPage * (page - 1)}.&nbsp;
					</span>
					<p>
						{item.product}, <span className={styles.price}>{item.price}₽</span> <br />
						<span className={styles.info}>
							brand: {item.brand ?? <>not established</>} <br />
							id: {item.id}
						</span>
					</p>
				</div>
			))}
		</div>
	)
}
