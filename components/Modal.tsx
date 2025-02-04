"use client"

import {
    Dialog,
    DialogOverlay,
    DialogContent, DialogTitle, DialogHeader
} from "@/components/ui/dialog"

export default function Modal({children, isOpen, handleClose}: { children: React.ReactNode, title: string, isOpen: boolean, handleClose: () => void }) {
    /*const router = useRouter()*/

    /*const handleOpenChange = () => {
        router.back() // para volver atras en la navegacion. El modal no interceptará esa ruta, por lo tanto se cerrará.
    }*/
/*
    //siempre esta abierto el modal, se visualiza cuando se ingresa a la URL asi lo intercepta*/
    return (
        /*<Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}> ESTO SERVIA PARA EL INTERCEPTOR
            <DialogOverlay>
                <DialogContent className="overflow-y-hidden" >
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            {title}
                        </DialogTitle>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </DialogOverlay>
        </Dialog>*/
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogOverlay>
                <DialogContent className="overflow-y-hidden" >
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Movement detail
                        </DialogTitle>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}