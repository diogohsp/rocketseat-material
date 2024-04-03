import styles from './Sidebar.module.css'
import { PencilLine } from  'phosphor-react'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img className={styles.cover} src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=30&w=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        
            <div className={styles.profile}>
                <img className={styles.avatar} src="https://avatars.githubusercontent.com/u/126338371?v=4" alt="" />
                <strong>Diogo Prado</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20}/>
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    )
}