'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import MovementsTable from "@/components/MovementsTable";
import {filterMovements, getBalance, getMovements} from '@/app/services/movements/actions'
import Link from "next/link";
import {clsx} from "clsx";
import {FilterOptions, INITIAL_FILTER_VALUE, INITIAL_MOVEMENT_VALUE,} from "@/lib/utils";
import SearchForm from "@/components/SearchForm";
import {Movement} from "@/schemas/MovementSchema";
import {useEffect, useState} from "react";
import MovementForm from "@/components/MovementForm";
import Modal from "@/components/Modal";

export default  function MovementTracker() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [balance, setBalance] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(INITIAL_FILTER_VALUE);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMovement, setSelectedMovement] = useState<Movement | undefined>();

  useEffect(() => {
      const fetchMovements = async () => {
          const movements = await filterMovements(filterOptions)
          console.log(movements)
          setMovements(movements)
      }
      fetchMovements()
  }, [filterOptions])
    useEffect(() => {
        console.log(movements)
        const fetchBalance = async () => {
            const balanceData = await getBalance()
            setBalance(balanceData)
        }
        fetchBalance()
    }, [movements])

    const showModalWithMovement= (mov: Movement | undefined) => {
      setSelectedMovement(mov)
      setShowModal(true)
    }
    const handleBack = () => {
      setShowModal(false)
    }

  return (
      <>
          <div className="grid grid-cols-[200px_auto] grid-rows-[100px_auto] gap-1">
            <Image src="/logo.png" alt="logo" width="180" height="100" className="font-bold col-start-1 row-start-1 m-auto" />
            <div className="mb-6 mx-20 flex items-center justify-between">
              <h1 className="text-xl font-semibold col-start-2 m-auto ml-0">Your movements</h1>
              <Button variant="outline" className="rounded-2xl w-32"><Link href="/login">Ingresar</Link></Button>
            </div>

            <main className="container mx-auto py-8 px-4 col-start-2 row-start-2 ml-0">
              <div className="mb-6 flex justify-around align-center">
                <div className={
                  clsx(
                      'p-4',
                      {
                        'bg-green-300': parseFloat(balance)>=0,
                        'bg-red-300': parseFloat(balance)<0,
                      }
                  )
                }>
                  <h2 className="text-2xl">{`Balance: ${balance}`}</h2>
                </div>
                <Button variant="default" className="rounded-2xl w-32 p-4" onClick={() => setShowModal(true)}>Crear</Button>
              </div>
              <div className="my-6 ">
                  <SearchForm setFilterOptions={setFilterOptions}/>
              </div>
              <MovementsTable movements={movements} showModalWithMovement={showModalWithMovement} setMovements={setMovements}/>
                {showModal &&
                    <Modal isOpen={showModal} handleClose={handleBack} title="Create movement" >
                        <MovementForm handleBack={handleBack} movement={selectedMovement} setMovements={setMovements} />
                    </Modal>
                }
            </main>
          </div>
      </>
  )
}

