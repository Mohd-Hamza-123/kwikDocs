import React from "react";
import { SearchDocs, WelcomeScrollDown } from '..';

const Welcome = () => {


    return (
        <div className="bg-gray-100 dark:bg-bgDark h-[91dvh] flex flex-col justify-center items-center font-calSans">
            <div className="lg:mx-auto mx-3 max-w-4xl rounded-lg p-4 lg:p-8 text-center w-[95%] lg:w-full h-[57%] flex flex-col justify-around">
                <h2 className="text-2xl lg:text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-red-500 font-bold">
                    Read Documentation like you read Stories
                </h2>
                <p className="text:md lg:text-xl text-gray-600 dark:text-gray-300 mb-6">
                    With the best guides and resources for developers.
                </p>
                <SearchDocs />
                <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium text-md lg:text-md">
                    Not Sure Where To Begin ?
                </p>
            </div>

            <WelcomeScrollDown />

        </div>
    )
}

export default Welcome