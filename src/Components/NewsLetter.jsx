import React from "react";
import Swal from "sweetalert2";
import news from "../assets/news.png"

const NewsLetter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        if (!email) {
            return;
        }
        Swal.fire({
            position: "center",
            icon: "success",
            title: "successfully Subscribed",
            showConfirmButton: false,
            timer: 1500,
        });
        e.target.reset();
    }
    return (
        <div className="bg-btn  my-12 py-12">
            <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-center items-center">
                    <img src={news} alt="" />
                </div>
                <div className="px-8 flex flex-col justify-center  gap-3">
                    <h1 className="text-black text-3xl font-bold text-start">Subscribe to our newsletter</h1>
                    <p className="text-nav w-full lg:w-[80%]">
                        In this newsletter provided our latest volunteer post. Stay
                        connected with us & get latest update of our volunteer post.
                    </p>
                    <div className="card w-full pt-12 mx-auto ">
                        <form onSubmit={handleSubscribe} className="card-body p-0">
                            <div className="form-control">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your  email"
                                    className="input input-bordered bg-white"
                                    required
                                />
                            </div>

                            <div className="form-control mt-1">
                                <button
                                    type="submit"
                                    className="rounded-md py-3 bg-nav hover:bg-green-logo text-white"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;