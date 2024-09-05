import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

interface PaginationType {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationType) => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
    return (
        <>
            <div className="join grid grid-cols-2 w-40 sm:w-80 my-5 mx-auto">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="join-item btn btn-outline">
                    <FaAnglesLeft fontSize={20} />
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="join-item btn btn-outline">
                    <FaAnglesRight fontSize={20} />
                </button>
            </div>
        </>
    )
}

export default Pagination
