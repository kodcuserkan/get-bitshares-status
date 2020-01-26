import React, { Component } from 'react'
import 'bootswatch/dist/slate/bootstrap.min.css'

const address = "https://bts.ai/api/v1/base_info";

class getBitshares extends Component {

    state = {
        head_block_num: null,
        last_irreversible_block_num: null,
        head_block_id: null,
        next_maintenance_time: null,
        chain_id: null,
        participation: null,
        current_account_count: null,
        current_supply: null,
        hits: 0
    }

    getData = async () => {

        const data = await fetch(address);
        const dataJson = await data.json();
        // console.log(dataJson.head_block_id);
        // console.log(typeof dataJson);
        if (this.state.head_block_num !== dataJson.head_block_num) {
            this.setState({
                head_block_num: dataJson.head_block_num,
                last_irreversible_block_num: dataJson.last_irreversible_block_num,
                head_block_id: dataJson.head_block_id,
                next_maintenance_time: dataJson.next_maintenance_time,
                chain_id: dataJson.chain_id,
                participation: dataJson.participation,
                current_account_count: dataJson.current_account_count,
                current_supply: dataJson.current_supply,
                hits : this.counter()
            });
            console.log(this.state);


        }
    }

    // componentDidMount() {
    //     this.setState({
    //         hits : 0
    //     })
    // }

    counter = () => {
        let count = this.state.hits;
        count++;
        return count;
    }

    timer = () => {
        setInterval(() => {
            this.getData();
        }, 1000);
    }

    render() {
        return (
            <div>
                
                {
                    this.timer()
                }
                <h1>
                    BTS sisteminden gelen anlık veriler :
                </h1>

                <div className="div-table">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col"><h2>Bilgi türü</h2></th>
                                <th scope="col"><h2>Karşılık Gelen Değer</h2></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-active">
                                <th scope="row">Blok Numarası : </th>
                                <td>{this.state.head_block_num}</td>
                            </tr>
                            <tr>
                                <th scope="row">Son Dönülemez Blok Numarası : </th>
                                <td>{this.state.last_irreversible_block_num}</td>
                            </tr>
                            <tr className="table-primary">
                                <th scope="row">Baş Blok ID : </th>
                                <td>{this.state.head_block_id}</td>
                            </tr>
                            <tr className="table-secondary">
                                <th scope="row">Gelecek Bakım Tarihi : </th>
                                <td>{this.state.next_maintenance_time}</td>
                            </tr>
                            <tr className="table-success">
                                <th scope="row">Blok Zincir ID'si : </th>
                                <td>{this.state.chain_id}</td>
                            </tr>
                            <tr className="table-danger">
                                <th scope="row">Katılım : </th>
                                <td>{this.state.participation === "100.00000000000000000" ? "%100" : this.state.participation}</td>
                            </tr>
                            <tr className="table-warning">
                                <th scope="row">Kayıtlı Kullanıcı Sayısı (Anlık) :</th>
                                <td>{this.state.current_account_count}</td>
                            </tr>
                            <tr className="table-info">
                                <th scope="row">Anlık Kaynak : </th>
                                <td>{this.state.current_supply}</td>
                            </tr>
                            <tr className="table-active">
                                <th scope="row">Yapılan Çağrı Sayacı : </th>
                                <td>{this.state.hits}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}


export default getBitshares;