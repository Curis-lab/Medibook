function formatMinipulator(impureData){
    /**
     * {
     * status;true,
     * message:'Successfully logged in.",
     * token,
     * data:{...rest},
     * role
     * }
     */
    return impureData.data;
}
export default formatMinipulator