'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from 'next/link';


export default function Page() {
      const [config, setConfig] = useState({
            bodyTypes: [],
            categories: [],
            color: [],
            equipmentSpecifications: [],
            regions: [],
            types: [],
      });
      const [data, setData] = useState<DataPost>({ ...initData });

      const [validateError, setValidateError] = useState<ValidationError>({ ...initValidateError })

      const MySwal = withReactContent(Swal)

      useEffect(() => {
            axios.get('/api/cars/create')
                  .then(response => {
                        console.log(response.data.config);

                        const data = response.data.config;

                        data['equipmentSpecifications'] = equipmentSpecifications(response.data.config.equipmentSpecifications)

                        setConfig(data)
                  })
                  .catch(err => console.error(err))
      }, []);

      const equipmentSpecifications = (equipment: [{ id: number, group_name: string, name: string, group: string }]) => {
            const data: any = {};
            equipment.forEach((value) => {
                  if (data[value.group_name]) {

                        data[value.group_name].push(value)
                  } else {
                        data[value.group_name] = [value]

                  }
            })

            return data;
      }

      const handleChange = (e: any) => {
            if (e.target.type === 'checkbox') {
                  setData({ ...data, [e.target.name]: e.target.checked });
            } else {
                  setData({ ...data, [e.target.name]: e.target.value });
            }
      }
      const handleMultiCheckbox = (e: any) => {
            const value = parseInt(e.target.value);
            const oldValue = data[e.target.name];

            // Nếu giá trị đã được chọn trước đó, ta sẽ xóa giá trị này khỏi mảng
            if (oldValue.indexOf(value) !== -1) {
                  const index = oldValue.indexOf(value);

                  setData({
                        ...data,
                        [e.target.name]: [
                              ...data[e.target.name].slice(0, index),
                              ...data[e.target.name].slice(index + 1),
                        ],
                  });
            }
            // Ngược lại, ta sẽ thêm giá trị mới vào mảng
            else {
                  setData({
                        ...data,
                        [e.target.name]: [
                              ...data[e.target.name],
                              value,
                        ],
                  });
            }
      }

      const handleSubmit = () => {
            if (handleValidate()) {
                  axios.post('/api/cars/store', data)
                        .then(response => {

                              MySwal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: `${response.data.response.message ?? 'Create car success'}`,
                                    showConfirmButton: false,
                                    timer: 1500
                              }).then(() => {
                                    setData({ ...initData });
                                    setValidateError({ ...initValidateError })
                              })
                        })
                        .catch(error => {
                              console.log({ error });
                              setValidateError(error.data)
                        });
            }

      }

      const handleValidate = () => {
            const errors: any = {};
            let isValid = true;

            for (const key of Object.keys(data)) {
                  if (!data[key as keyof DataPost]) {
                        isValid = false;
                        errors[key] = `${key} is required`;
                  }
            }

            if (!isValid) {
                  setValidateError(errors);
            }

            return isValid;
      }
      return (
            <div className="container">
                  <h1 className="text-center">Form Create</h1>
                  <p className='error-message'>{validateError['api']}</p>
                  <div className="row">
                        <div className="col-8">
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">Name</label>
                                    <div className="col-9">
                                          <input type="text" onChange={handleChange} value={data.name} name="name" className="form-control" />
                                          <p className='error-message'>{validateError['name']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">Region</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.region_id} name="region_id" aria-label="Default select example">
                                                {
                                                      config['regions'].map((region: { id: number, name: string }) => {
                                                            return <option key={region.id} value={region.id}>{region.name}</option>
                                                      })
                                                }
                                          </select>
                                          <p className='error-message'>{validateError['region_id']}</p>
                                    </div>
                              </div>

                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">Category</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.category_id} name="category_id" aria-label="Default select example">
                                                {
                                                      config['categories'].map((category: { id: number, name: string }) => {
                                                            return <option key={category.id} value={category.id}>{category.name}</option>
                                                      })
                                                }
                                          </select>
                                          <p className='error-message'>{validateError['category_id']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">model name</label>
                                    <div className="col-9">
                                          <input type="text" onChange={handleChange} value={data.model_name} name="model_name" className="form-control" />
                                          <p className='error-message'>{validateError['model_name']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">model year</label>
                                    <div className="col-9">
                                          <input type="number" min={0} max={1000000} onChange={handleChange} value={data.model_year} name="model_year" className="form-control" />
                                          <p className='error-message'>{validateError['model_year']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">Body Type Id</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.body_type_id} name="body_type_id" aria-label="Default select example">
                                                {
                                                      config['bodyTypes'].map((bodyType: { id: number, name: string }) => {
                                                            return <option key={bodyType.id} value={bodyType.id}>{bodyType.name}</option>
                                                      })
                                                }
                                          </select>
                                          <p className='error-message'>{validateError['body_type_id']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">running</label>
                                    <div className="col-9">
                                          <input type="number" min={0} max={1000000} onChange={handleChange} value={data.running} name="running" className="form-control" />
                                          <p className='error-message'>{validateError['running']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">mission type</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.mission_id} name="mission_id" aria-label="Default select example">
                                                <option value="1">AT</option>
                                                <option value="2">MT</option>
                                          </select>
                                          <p className='error-message'>{validateError['mission_id']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">mission description</label>
                                    <div className="col-9">
                                          <input type="text" onChange={handleChange} value={data.mission_description} name="mission_description" className="form-control" />
                                          <p className='error-message'>{validateError['mission_description']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">drive system</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.drive_system} name="drive_system" aria-label="Default select example">

                                                <option value="1">AT</option>
                                                <option value="2">MT</option>
                                          </select>
                                          <p className='error-message'>{validateError['drive_system']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">price</label>
                                    <div className="col-9">
                                          <input type="number" min={0} max={1000000} onChange={handleChange} value={data.price} name="price" className="form-control" />
                                          <p className='error-message'>{validateError['price']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">total_payment</label>
                                    <div className="col-9">
                                          <input type="number" min={0} max={1000000} onChange={handleChange} value={data.total_payment} name="total_payment" className="form-control" />
                                          <p className="error-message">{validateError['total_payment']}</p>
                                    </div>
                              </div>

                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">length</label>
                                    <div className="col-9">
                                          <input type="number" min={0} max={1000000} onChange={handleChange} value={data.length} name="length" className="form-control" />
                                          <p className="error-message">{validateError['length']}</p>
                                    </div>
                              </div>

                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">width</label>
                                    <div className="col-9">
                                          <input type="number" min={0} max={1000000} onChange={handleChange} value={data.width} name="width" className="form-control" />
                                          <p className="error-message">{validateError['width']}</p>
                                    </div>
                              </div>

                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">height</label>
                                    <div className="col-9">
                                          <input type="number" min={0} max={1000000} onChange={handleChange} value={data.height} name="height" className="form-control" />
                                          <p className="error-message">{validateError['height']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">remaining_car_inspection</label>
                                    <div className="col-9">
                                          <input type="number" min={0} max={1000000} onChange={handleChange} value={data.remaining_car_inspection} name="remaining_car_inspection" className="form-control" />
                                          <p className="error-message">{validateError['remaining_car_inspection']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">color</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.color} name="color" aria-label="Default select example">
                                                {
                                                      config['color'].map((value: { id: number, name: string }) => {
                                                            return <option key={value.id} value={value.id}>{value.name}</option>
                                                      })
                                                }
                                          </select>
                                          <p className="error-message">{validateError['color']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">repair_history</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.repair_history} name="repair_history" aria-label="Default select example">

                                                <option value="1">AT</option>
                                                <option value="2">MT</option>
                                          </select>
                                          <p className="error-message">{validateError['repair_history']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">fuel</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.fuel} name="fuel" aria-label="Default select example">
                                                <option value="1">gasoline</option>
                                                <option value="2">light oil</option>
                                          </select>
                                          <p className="error-message">{validateError['fuel']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">handle</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.handle} name="handle" aria-label="Default select example">
                                                <option value="1">right</option>
                                                <option value="2">left</option>
                                          </select>
                                          <p className="error-message">{validateError['handle']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">passenger</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.passenger} name="passenger" aria-label="Default select example">
                                                {
                                                      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20].map((value) => {
                                                            return <option key={value} value={value}>{value}</option>
                                                      })
                                                }
                                          </select>
                                          <p className="error-message">{validateError['passenger']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">number_doors</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.number_doors} name="number_doors" aria-label="Default select example">
                                                {
                                                      [0, 1, 2, 3, 4, 5].map((value) => {
                                                            return <option key={value} value={value}>{value}</option>
                                                      })
                                                }
                                          </select>
                                          <p className="error-message">{validateError['number_doors']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">displacement</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.displacement} name="displacement" aria-label="Default select example">
                                                {
                                                      [550, 660, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5500, 6000].map((value) => {
                                                            return <option key={value} value={value}>{value}cc</option>
                                                      })
                                                }
                                          </select>
                                          <p className="error-message">{validateError['displacement']}</p>
                                    </div>
                              </div>
                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">slide_door</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.slide_door} name="slide_door" aria-label="Default select example">
                                                {
                                                      [
                                                            {
                                                                  id: 47,
                                                                  name: "one side (manual)"
                                                            },
                                                            {
                                                                  id: 34,
                                                                  name: "One side (electric)"
                                                            },
                                                            {
                                                                  id: 48,
                                                                  name: "both sides (manual)"
                                                            },
                                                            {
                                                                  id: 43,
                                                                  name: "Both sides (electric)"
                                                            },
                                                            {
                                                                  id: 3447,
                                                                  name: "Both sides (one side manual / one side electric)"
                                                            }
                                                      ].map((value) => {
                                                            return <option key={value.id} value={value.id}>{value.name}</option>
                                                      })
                                                }
                                          </select>
                                          <p className="error-message">{validateError['slide_door']}</p>
                                    </div>
                              </div>

                              <div className="form-group row mb-2">
                                    <label className="col-3" htmlFor="">status</label>
                                    <div className="col-9">
                                          <select onChange={handleChange} className="form-select" value={data.status} name="status" aria-label="Default select example">
                                                <option value="1">New</option>
                                                <option value="2">normal</option>
                                                <option value="0">SOLD OUT</option>
                                          </select>
                                    </div>
                              </div>

                              <div className="from-group">
                                    <label htmlFor="">Additional information</label>
                                    <div className="row ms-0">
                                          <div className="form-check col-3">
                                                <input className="form-check-input" type="checkbox" onChange={handleChange} checked={!!data.has_certified} name="has_certified" id="flexCheckChecked" />
                                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                                      has certified
                                                </label>
                                          </div>

                                          <div className="form-check col-3">
                                                <input className="form-check-input" type="checkbox" onChange={handleChange} checked={!!data.guaranteed} name="guaranteed" id="flexCheckChecked2" />
                                                <label className="form-check-label" htmlFor="flexCheckChecked2">
                                                      guaranteed
                                                </label>
                                          </div>

                                    </div>
                              </div>
                              <div className="from-group">
                                    <label htmlFor="">Car Type</label>
                                    <div className="row ms-0">
                                          {
                                                config['types'].map((value: { id: number, name: string }) => {
                                                      return (
                                                            <div key={value.id} className="form-check col-3">
                                                                  <input className="form-check-input" onChange={handleMultiCheckbox} checked={data['types'].indexOf(value.id) !== -1} name="types" type="checkbox" value={value.id} id={`type_${value.id}`} />
                                                                  <label className="form-check-label" htmlFor={`type_${value.id}`}>
                                                                        {value.name}
                                                                  </label>
                                                            </div>)
                                                })
                                          }

                                    </div>
                              </div>
                              <div className="from-group">
                                    <label htmlFor="">Additional information</label>
                                    <div className="row ms-0 equipment">
                                          {
                                                [
                                                      {
                                                            name: 'basic_equipment',
                                                            label: 'Basic Equipment'
                                                      },
                                                      {
                                                            name: 'exterior',
                                                            label: 'Exterior'
                                                      },
                                                      {
                                                            name: "interior",
                                                            label: "Interior"
                                                      },
                                                      {
                                                            name: "safety_device",
                                                            label: "Safety Device"
                                                      },
                                                      {
                                                            name: "situation",
                                                            label: "Situation",
                                                      },
                                                ].map((value) => {
                                                      return (
                                                            <div key={value.name} className="col-auto border-start">
                                                                  <label htmlFor="">{value.label}</label>
                                                                  {

                                                                        config['equipmentSpecifications'][value.name]?.map((value: { id: number, name: string, group_name: string }) => {
                                                                              return (
                                                                                    <div key={value.id} className="form-check">
                                                                                          <input className="form-check-input" name="equipment_specifications" onChange={handleMultiCheckbox} type="checkbox" checked={data['equipment_specifications'].indexOf(value.id) !== -1} value={value.id} id={`equipmentSpecifications_${value.id}`} />
                                                                                          <label className="form-check-label" htmlFor={`equipmentSpecifications_${value.id}`}>
                                                                                                {value.name}
                                                                                          </label>
                                                                                    </div>)
                                                                        })
                                                                  }
                                                            </div>
                                                      )
                                                })
                                          }
                                    </div>
                              </div>
                        </div>
                        <div className="col-4">
                              <div className="form-group row mb-2">
                              </div>
                        </div>
                  </div>
                  <hr />
                  <div className="footer d-flex align-items-center justify-content-end">
                        <Link className="btn btn-secondary" href={'/admin/cars'}>Cancel</Link>

                        <button onClick={handleSubmit} className="btn btn-primary ms-2">Save</button>
                  </div>
            </div>
      )
}

const initData = {
      name: '',
      model_name: '',
      region_id: 1,
      category_id: 1,
      body_type_id: 1,
      mission_id: 1,
      mission_description: '',
      drive_system: 1,
      color: 1,
      repair_history: 1,
      fuel: 1,
      handle: 1,
      passenger: 1,
      number_doors: 1,
      displacement: 1,
      slide_door: 1,
      status: 1,
      model_year: 0,
      running: 0,
      price: 0,
      total_payment: 0,
      length: 0,
      width: 0,
      height: 0,
      remaining_car_inspection: 0,
      has_certified: true,
      guaranteed: true,
      types: [],
      equipment_specifications: []
};

const initValidateError = {
      name: '',
      model_name: '',
      region_id: '',
      category_id: '',
      body_type_id: '',
      mission_id: '',
      mission_description: '',
      drive_system: '',
      color: '',
      repair_history: '',
      fuel: '',
      handle: '',
      passenger: '',
      number_doors: '',
      displacement: '',
      slide_door: '',
      status: '',
      model_year: '',
      running: '',
      price: '',
      total_payment: '',
      length: '',
      width: '',
      height: '',
      remaining_car_inspection: '',
      has_certified: '',
      guaranteed: '',
      types: '',
      equipment_specifications: '',
      api: ''
};

interface DataPost {
      name: string,
      model_name: string,
      mission_description: string,
      region_id: number,
      category_id: number,
      body_type_id: number,
      mission_id: number,
      drive_system: number,
      color: number,
      repair_history: number,
      fuel: number,
      handle: number,
      passenger: number,
      number_doors: number,
      displacement: number,
      slide_door: number,
      status: number,
      model_year: number,
      running: number,
      price: number,
      total_payment: number,
      length: number,
      width: number,
      height: number,
      remaining_car_inspection: number,
      has_certified: Boolean,
      guaranteed: Boolean,
      types: Array<number>,
      equipment_specifications: Array<number>
}

interface ValidationError {
      name: string,
      model_name: string,
      mission_description: string,
      region_id: string,
      category_id: string,
      body_type_id: string,
      mission_id: string,
      drive_system: string,
      color: string,
      repair_history: string,
      fuel: string,
      handle: string,
      passenger: string,
      number_doors: string,
      displacement: string,
      slide_door: string,
      status: string,
      model_year: string,
      running: string,
      price: string,
      total_payment: string,
      length: string,
      width: string,
      height: string,
      remaining_car_inspection: string,
      has_certified: string,
      guaranteed: string,
      types: string,
      equipment_specifications: string,
      api: string
}