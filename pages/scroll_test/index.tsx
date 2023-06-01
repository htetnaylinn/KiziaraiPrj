import style from './style.module.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSupabaseClient ,useUser} from "@supabase/auth-helpers-react";
import { useState,useEffect } from 'react';
import FabricView from '../../components/fabric_view/fabric_view';

const ScrollTest = ()=>{

    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const [list, setList] = useState<any[]>([]);
    const [count,setCount] = useState(0);

    useEffect(()=>{
        (async  ()=>{
            let {data,error} = await supabaseClient.from('ka_fabrics').select().range(0,2);
            console.log(data,error);
            if(data){
                
                /*
                for(let i =0; i <6; i++){
                    let copy_data = JSON.parse(JSON.stringify(data))
                    data = data?.concat(copy_data);
                }*/

                setList(data);
            }
        })();
    },[user]);

    const readMore = async ()=>{

        let count_more = count+3;

        let {data,error} = await supabaseClient.from('ka_fabrics').select().range(3+count,2 + count_more);
        console.log(data,error);
        if(data){
            let new_list = list.concat(data);
            setList(new_list);
        }
        setCount(count_more);

    }

    /*
    const insertNewFabric= async ()=>{

        let {data,error} = await supabaseClient.from('ka_fabrics').select();
        console.log(data,error);
        if(data){

            alert('copy');
            let d = data[0];
            delete d.id;
            console.log(d);
            
            for(let i = 10; i < 65; i++){
            
                d.texture_name_jp = `第${i}生地`;
                d.texture_name_en = `NO.${i} Fabric`;
                d.kiziarai_id = `XYZA-000${i}-00-01`;
                
                let {error} = await supabaseClient.from('ka_fabrics').insert(d);

                console.log(error)
                setCount(i);
            }
        }
    }
    */

    return (<div>

        <div>btn</div>
        <h1>{count}</h1>

        <InfiniteScroll 
        dataLength={list.length}
        next={readMore}
        hasMore={true}
        loader={(<div>loading...</div>)}
        >
            {list.map((d)=>{
                return <FabricView {...d} key={d.id} />
            })}
        </InfiniteScroll>

    </div>)
}

export default ScrollTest;