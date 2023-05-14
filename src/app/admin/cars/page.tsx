import Link from 'next/link';
export default function Page() {

      return (
            <div>
                  <div className="row align-items-center">
                        <h1 className="col-6">Car list</h1>
                        <div className="add-new col-6 text-end">
                              <Link href="/admin/cars/create" className="btn btn-success">Add new</Link>
                        </div>
                  </div>
                  <table className="table table-bordered">
                        <thead>
                              <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Fuel</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                              </tr>
                        </thead>
                        <tbody>
                              <tr>
                                    <td scope="col">#</td>
                                    <td scope="col">Name</td>
                                    <td scope="col">Price</td>
                                    <td scope="col">Category</td>
                                    <td scope="col">Color</td>
                                    <td scope="col">Fuel</td>
                                    <td scope="col">Status</td>
                                    <td scope="col">
                                          <div className='row'>
                                                <a href=""><i className="fa-solid fa-trash text-danger"></i></a>
                                          </div>
                                    </td>
                              </tr>
                        </tbody>
                  </table>
            </div>
      )
}