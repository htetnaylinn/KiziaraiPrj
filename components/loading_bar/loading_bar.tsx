import style from './loading_bar.module.css'

const LoadingBar = ()=>{


    return (<div className={style.loading_bar_container}>
        <div className={style.loading_bar}></div>
    </div>)

}

export default LoadingBar;