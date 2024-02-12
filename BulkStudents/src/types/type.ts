export interface Student{
    id: number | null,
    studentName: string,
    studentAge: number | null,
    studentEmail: string,
    studentName_error ?: string,
    studentAge_error ?: string,
    studentEmail_error ?: string,
    isNameEmpty ?: boolean,
    isAgeEmpty ?: boolean,
    isEmailEmpty ?: boolean,
}

export interface collection {
    studentsData : Student[]
}