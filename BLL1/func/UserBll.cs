using AutoMapper;
using BLL.DTO;
using BLL.interfaces;
using DAL1.func;
using DAL1.interfaces;
using DAL1.models;
using System.Net.Mail;
using System.Text;
using BLL.DTO;


namespace BLL1.func
{
    public class UserBll : IUserBll
    {
        IUserDal UserDal;
        IMapper mapper;
        public UserBll (IUserDal Idal)
        {
            UserDal = Idal;
            var config = new MapperConfiguration(mcf =>
            {
                mcf.AddProfile<mapper>();
            });
            mapper = config.CreateMapper();
        }

        public UserDTO? FindUser(string i, string P)

        {
            User u = UserDal.FindUser(i, P);
            return mapper.Map<User, UserDTO>(u);

        }

        public UserDTO SelctUser(OfferDTO o)
        {

            //User t = UserDal.SelctUser(o);
            return mapper.Map<User, UserDTO>(UserDal.getbyid(o.OfferUserId));

        }

        public bool SendEmail(OfferDTO r, UserDTO u)
        //(string email, string subject, string body)
        {
            string x = u.Mail;
            UserDTO t = SelctUser(r);
            string y = t.Mail;
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                mail.From = new MailAddress(x);
                mail.To.Add(y);
                mail.Subject = "Working for you";
                mail.IsBodyHtml = true;
                mail.BodyEncoding = Encoding.UTF8;
                // שלום ל?
                // מצאנו עבורך בעל מקצוע?
                //לצורך המשך התקשרו יש ליצור קשר בטלפון?
                mail.Body = "שלום ל" + (t.FirstName) + Environment.NewLine +
                 " מצאנו עבורך" + (r.Profession) + Environment.NewLine +
              "לצורך המשך התקשרות יש ליצור קשר בטלפון" + (u.Phone);

                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential(x, u.FirstName);
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }



        public List<RequestDTO> SelctReq(OfferDTO o)
        {
            o.user= mapper.Map<User, UserDTO>(UserDal.getbyid(o.OfferUserId));
            //שליפת כל הבקשות שקוד המקצוע שלהם זהה לקוד המקצוע של ההצעה
            //ניצור משתנה שיכיל את הימים שהמציע יכול
            //נעבור בלולאה על רשימת הבקשות שהתקבלה
            // getDay - עבור כל אחד נשלוף עי פונקציית 
            //המחזירה את היום בשבוע של התאריך
            //נעבור בלולאה םנימית על רשימת הימים של המציע
            //ונבדוק האם יש התאמה
            //אם עבר על כל רשימת הימים ואין התאמה נחמק אותו מהרשימה
            List<RequestDTO> l = mapper.Map<List<Request>, List<RequestDTO>>(UserDal.SelctReq(mapper.Map<OfferDTO, Offer>(o)));
            List<RequestDTO> ll = new List<RequestDTO>();
            for (int i = 0; i < l.Count; i++)
            {
                //string x = l[i].Date.ToString();+++

                string x = l[i].Date.DayOfWeek.ToString();
                if (l[i].userR.City== o.user.City)
                    for (int j = 0; j < o.DaysToworks.Count; j++)
                {
                        string y = o.DaysToworks[j].Date;
                        if (y == x)
                        {

                            ll.Add(l[i]);
                        }
                        ////    double p = o.DaysToworks[j].Fromhour;
                        ////    if (l[i].Fromhour < p || l[i].Tohour > p)
                        ////    {
                        ////        ll.Add(l[i]);
                        break;
                        
                }
            }

            return ll;
        }
        //מקבלים בקשה
        public List<OfferDTO> SelctOffer(RequestDTO r)
        {
            r.userR = mapper.Map<User, UserDTO>(UserDal.getbyid(r.RequestUserId));

            List<OfferDTO> LO = mapper.Map<List<Offer>, List<OfferDTO>>(UserDal.SelctOffer(mapper.Map<RequestDTO, Request>(r)));
            List<OfferDTO> LOL = new List<OfferDTO>();
            string x = r.Date.DayOfWeek.ToString();
            for (int i = 0; i < LO.Count; i++)
            {
                if ((LO[i].userO != null) && LO[i].userO.City == r.City)
                    for (int j = 0; j < LO[i].DaysToworks.Count; j++)
                    {
                        if (LO[i].DaysToworks[j].Date == x)
                        {
                            OfferDTO modifiedLO = LO[i]; // יצירת עותק של האובייקט LO[i]
                            modifiedLO.DaysToworks = new List<DaysToworkDTO> { LO[i].DaysToworks[j] }; // שינוי מערך DaysToworks להכיל רק את הערך במקום j
                            LOL.Add(modifiedLO); // הוספת האובייקט המותאם לרשימה
                            break;
                        }

                        //if (LO[i].DaysToworks[j].Date == x)
                        //{


                        //    LOL.Add(LO[i]);



                        //    break;
                        //}

                        //if (r.Fromhour < LO[i].off.fr)
                    }
            }
            return LOL;

        }

        public bool AddUser(UserDTO a)
        {
            return UserDal.AddUser(mapper.Map<UserDTO, User>(a));
        }

        
       

        public UserDTO UpUser(UserDTO a)
        {
            return mapper.Map<User,UserDTO>(UserDal.UpUser(mapper.Map<UserDTO, User>(a)));
        }
    }

}
    
//
//        //ailAddress from = new MailAddress("u.email", "email");
//        //MailAddress to = new MailAddress("email", "email");
//        MailAddress from = new MailAddress("test@example.com", "TestFromName");
//        MailAddress to = new MailAddress("test2@example.com", "TestToName");
//        MailMessage myMail = new System.Net.Mail.MailMessage(from, to);

//        // add ReplyTo
//        MailAddress replyTo = new MailAddress("reply@example.com");
//        myMail.ReplyToList.Add(replyTo);

//        // set subject and encoding
//        myMail.Subject = "פרטי התקשרות";
//        myMail.SubjectEncoding = System.Text.Encoding.UTF8;


//        // שלום ל?
//        // מצאנו עבורך בעל מקצוע?
//        //לצורך המשך התקשרו יש ליצור קשר בטלפון?
//        // set body-message and encoding
//        myMail.Body = "<b>Test Mail</b><br>using <b>HTML</b>.";
//        myMail.BodyEncoding = System.Text.Encoding.UTF8;
//        // text or html
//        myMail.IsBodyHtml = true;

//        mySmtpClient.Send(myMail);
//        return true;
//    }


//    catch (SmtpException ex)
//    {
//        throw new ApplicationException
//          ("SmtpException has occured: " + ex.Message);
//    }

//}




//    public class UserBll : IUserBll
//    {
//        IUserDal UserDal;
//        IMapper mapper;
//        public UserBll(IUserDal Idal)
//        {
//            UserDal = Idal;
//            var config = new MapperConfiguration(mcf =>
//            {
//                mcf.AddProfile<mapper>();
//            });
//            mapper = config.CreateMapper();
//        }

//        public bool AddUser(UserDTO a)
//        {
//            return UserDal.AddUser(mapper.Map<UserDTO, User>(a));
//        }

//        public UserDTO? FindUser(string i, string P)

//        {
//            User u = UserDal.FindUser(i, P);
//            return mapper.Map<User, UserDTO>(u);

//        }



//    }
//}

